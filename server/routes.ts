import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertProfileSchema, insertInterestSchema } from "@shared/schema";
import { calculateCompatibility, analyzePersonality, generateProfileSuggestions } from "./ai";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Extend Express Request type to include user
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

// Middleware to verify JWT token
const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({ user: { ...user, password: undefined }, token });
    } catch (error: any) {
      res.status(400).json({ message: "Registration failed", error: error.message });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({ user: { ...user, password: undefined }, token });
    } catch (error: any) {
      res.status(400).json({ message: "Login failed", error: error.message });
    }
  });

  // Profile routes
  app.get("/api/profile", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userWithProfile = await storage.getUserWithProfile(req.user!.userId);
      if (!userWithProfile) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(userWithProfile);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch profile", error: error.message });
    }
  });

  app.post("/api/profile", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const profileData = insertProfileSchema.parse(req.body);
      
      // Check if profile already exists
      const existingProfile = await storage.getProfile(req.user!.userId);
      if (existingProfile) {
        return res.status(400).json({ message: "Profile already exists" });
      }

      // Calculate profile completeness
      const completeness = calculateProfileCompleteness(profileData);
      
      const profile = await storage.createProfile({
        ...profileData,
        userId: req.user!.userId,
        profileCompleteness: completeness,
      });

      // Analyze personality with AI
      const personalityAnalysis = await analyzePersonality(profileData);
      await storage.updateProfile(req.user!.userId, {
        personalityTraits: personalityAnalysis.traits,
      });

      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ message: "Profile creation failed", error: error.message });
    }
  });

  app.put("/api/profile", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const updates = insertProfileSchema.partial().parse(req.body);
      
      // Calculate profile completeness
      const existingProfile = await storage.getProfile(req.user!.userId);
      if (!existingProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      const updatedData = { ...existingProfile, ...updates };
      const completeness = calculateProfileCompleteness(updatedData);
      
      const profile = await storage.updateProfile(req.user!.userId, {
        ...updates,
        profileCompleteness: completeness,
      });

      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ message: "Profile update failed", error: error.message });
    }
  });

  // Matches and recommendations
  app.get("/api/matches", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const matches = await storage.getMatches(req.user!.userId, 10);
      res.json(matches);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch matches", error: error.message });
    }
  });

  app.get("/api/recommendations", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userProfile = await storage.getProfile(req.user!.userId);
      if (!userProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      const recommendations = await storage.getRecommendations(req.user!.userId, 10);
      
      // Calculate compatibility for each recommendation
      const recommendationsWithScores = await Promise.all(
        recommendations.map(async (profile) => {
          const compatibility = await calculateCompatibility(userProfile, profile);
          
          // Create match record
          await storage.createMatch({
            userId: req.user!.userId,
            matchedUserId: profile.userId,
            compatibilityScore: compatibility.overallScore,
            scoreBreakdown: compatibility.scoreBreakdown,
            aiInsights: compatibility.insights,
          });

          return {
            profile,
            compatibility,
          };
        })
      );

      res.json(recommendationsWithScores);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch recommendations", error: error.message });
    }
  });

  // Interest management
  app.post("/api/interests", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const interestData = insertInterestSchema.parse({
        ...req.body,
        fromUserId: req.user!.userId,
      });

      const interest = await storage.createInterest(interestData);
      res.json(interest);
    } catch (error: any) {
      res.status(400).json({ message: "Failed to express interest", error: error.message });
    }
  });

  app.get("/api/interests/:type", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { type } = req.params;
      if (type !== 'sent' && type !== 'received') {
        return res.status(400).json({ message: "Invalid interest type" });
      }

      const interests = await storage.getInterests(req.user!.userId, type);
      res.json(interests);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch interests", error: error.message });
    }
  });

  app.put("/api/interests/:id", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const interest = await storage.updateInterestStatus(id, status);
      res.json(interest);
    } catch (error: any) {
      res.status(400).json({ message: "Failed to update interest", error: error.message });
    }
  });

  // AI-powered features
  app.get("/api/ai/profile-suggestions", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const profile = await storage.getProfile(req.user!.userId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      const suggestions = await generateProfileSuggestions(profile);
      res.json({ suggestions });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to generate suggestions", error: error.message });
    }
  });

  app.post("/api/ai/compatibility", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { targetUserId } = req.body;
      
      const userProfile = await storage.getProfile(req.user!.userId);
      const targetProfile = await storage.getProfile(targetUserId);
      
      if (!userProfile || !targetProfile) {
        return res.status(404).json({ message: "Profile(s) not found" });
      }

      const compatibility = await calculateCompatibility(userProfile, targetProfile);
      res.json(compatibility);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to calculate compatibility", error: error.message });
    }
  });

  // Search profiles
  app.get("/api/search", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const filters = req.query;
      const profiles = await storage.searchProfiles(filters, req.user!.userId, 20);
      res.json(profiles);
    } catch (error: any) {
      res.status(500).json({ message: "Search failed", error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function calculateProfileCompleteness(profile: any): number {
  const requiredFields = [
    'age', 'gender', 'religion', 'education', 'occupation', 
    'location', 'bio', 'photos', 'interests', 'values'
  ];
  
  let completedFields = 0;
  
  requiredFields.forEach(field => {
    if (profile[field]) {
      if (Array.isArray(profile[field]) && profile[field].length > 0) {
        completedFields++;
      } else if (typeof profile[field] === 'string' && profile[field].trim()) {
        completedFields++;
      } else if (typeof profile[field] === 'number' && profile[field] > 0) {
        completedFields++;
      }
    }
  });
  
  return Math.round((completedFields / requiredFields.length) * 100);
}
