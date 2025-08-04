import { users, profiles, matches, interests, type User, type InsertUser, type Profile, type InsertProfile, type Match, type InsertMatch, type Interest, type InsertInterest, type UserWithProfile, type MatchWithProfile } from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, ne, inArray } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;
  
  // Profile operations
  getProfile(userId: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile & { userId: string }): Promise<Profile>;
  updateProfile(userId: string, updates: Partial<InsertProfile>): Promise<Profile | undefined>;
  getUserWithProfile(userId: string): Promise<UserWithProfile | undefined>;
  
  // Match operations
  getMatches(userId: string, limit?: number): Promise<MatchWithProfile[]>;
  createMatch(match: InsertMatch): Promise<Match>;
  updateMatchStatus(matchId: string, status: string): Promise<Match | undefined>;
  
  // Interest operations
  getInterests(userId: string, type: 'sent' | 'received'): Promise<Interest[]>;
  createInterest(interest: InsertInterest): Promise<Interest>;
  updateInterestStatus(interestId: string, status: string): Promise<Interest | undefined>;
  
  // Search and recommendation operations
  searchProfiles(filters: Record<string, any>, excludeUserId: string, limit?: number): Promise<Profile[]>;
  getRecommendations(userId: string, limit?: number): Promise<Profile[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getProfile(userId: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return profile || undefined;
  }

  async createProfile(profile: InsertProfile & { userId: string }): Promise<Profile> {
    // Ensure array fields are properly typed
    const profileData = {
      ...profile,
      interests: profile.interests || [],
      values: profile.values || [],
      photos: profile.photos || [],
      lifestyle: profile.lifestyle || {},
      personalityTraits: profile.personalityTraits || {},
      partnerPreferences: profile.partnerPreferences || {},
    };
    
    const [newProfile] = await db
      .insert(profiles)
      .values([profileData])
      .returning();
    return newProfile;
  }

  async updateProfile(userId: string, updates: Partial<InsertProfile>): Promise<Profile | undefined> {
    const updateData: any = { ...updates, updatedAt: new Date() };
    
    // Ensure arrays are properly handled
    if (updates.values && Array.isArray(updates.values)) {
      updateData.values = updates.values;
    }
    if (updates.interests && Array.isArray(updates.interests)) {
      updateData.interests = updates.interests;
    }
    if (updates.photos && Array.isArray(updates.photos)) {
      updateData.photos = updates.photos;
    }
    
    const [profile] = await db
      .update(profiles)
      .set(updateData)
      .where(eq(profiles.userId, userId))
      .returning();
    return profile || undefined;
  }

  async getUserWithProfile(userId: string): Promise<UserWithProfile | undefined> {
    const [result] = await db
      .select()
      .from(users)
      .leftJoin(profiles, eq(users.id, profiles.userId))
      .where(eq(users.id, userId));
    
    if (!result) return undefined;
    
    return {
      ...result.users,
      profile: result.profiles || undefined,
    };
  }

  async getMatches(userId: string, limit = 10): Promise<MatchWithProfile[]> {
    const results = await db
      .select()
      .from(matches)
      .innerJoin(users, eq(matches.matchedUserId, users.id))
      .innerJoin(profiles, eq(users.id, profiles.userId))
      .where(eq(matches.userId, userId))
      .orderBy(desc(matches.compatibilityScore))
      .limit(limit);

    return results.map(result => ({
      ...result.matches,
      matchedUser: {
        ...result.users,
        profile: result.profiles,
      },
    }));
  }

  async createMatch(match: InsertMatch): Promise<Match> {
    const [newMatch] = await db
      .insert(matches)
      .values(match)
      .returning();
    return newMatch;
  }

  async updateMatchStatus(matchId: string, status: string): Promise<Match | undefined> {
    const [match] = await db
      .update(matches)
      .set({ status })
      .where(eq(matches.id, matchId))
      .returning();
    return match || undefined;
  }

  async getInterests(userId: string, type: 'sent' | 'received'): Promise<Interest[]> {
    const field = type === 'sent' ? interests.fromUserId : interests.toUserId;
    return await db
      .select()
      .from(interests)
      .where(eq(field, userId))
      .orderBy(desc(interests.createdAt));
  }

  async createInterest(interest: InsertInterest): Promise<Interest> {
    const [newInterest] = await db
      .insert(interests)
      .values(interest)
      .returning();
    return newInterest;
  }

  async updateInterestStatus(interestId: string, status: string): Promise<Interest | undefined> {
    const [interest] = await db
      .update(interests)
      .set({ status })
      .where(eq(interests.id, interestId))
      .returning();
    return interest || undefined;
  }

  async searchProfiles(filters: Record<string, any>, excludeUserId: string, limit = 20): Promise<Profile[]> {
    let query = db.select().from(profiles).where(and(
      ne(profiles.userId, excludeUserId),
      eq(profiles.isActive, true)
    ));

    if (filters.minAge || filters.maxAge) {
      // Add age filtering logic
    }
    if (filters.religion) {
      // Add religion filtering logic
    }
    if (filters.location) {
      // Add location filtering logic
    }

    return await query.limit(limit);
  }

  async getRecommendations(userId: string, limit = 10): Promise<Profile[]> {
    // Simple recommendation logic - in production, this would use AI
    return await db
      .select()
      .from(profiles)
      .where(and(
        ne(profiles.userId, userId),
        eq(profiles.isActive, true)
      ))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
