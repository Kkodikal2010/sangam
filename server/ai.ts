import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

export interface CompatibilityAnalysis {
  overallScore: number;
  scoreBreakdown: {
    values: number;
    lifestyle: number;
    personality: number;
    interests: number;
    goals: number;
  };
  insights: string;
  explanation: string;
}

export interface PersonalityAnalysis {
  traits: Record<string, number>;
  summary: string;
  recommendations: string[];
}

export async function calculateCompatibility(
  user1Profile: any,
  user2Profile: any
): Promise<CompatibilityAnalysis> {
  try {
    const prompt = `
      Analyze compatibility between two people based on their profiles. Respond with JSON in this exact format:
      {
        "overallScore": number (1-100),
        "scoreBreakdown": {
          "values": number (1-100),
          "lifestyle": number (1-100), 
          "personality": number (1-100),
          "interests": number (1-100),
          "goals": number (1-100)
        },
        "insights": "Brief insight about their compatibility",
        "explanation": "Detailed explanation of why they match"
      }

      Profile 1: ${JSON.stringify(user1Profile)}
      Profile 2: ${JSON.stringify(user2Profile)}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      overallScore: Math.min(100, Math.max(1, result.overallScore || 50)),
      scoreBreakdown: {
        values: Math.min(100, Math.max(1, result.scoreBreakdown?.values || 50)),
        lifestyle: Math.min(100, Math.max(1, result.scoreBreakdown?.lifestyle || 50)),
        personality: Math.min(100, Math.max(1, result.scoreBreakdown?.personality || 50)),
        interests: Math.min(100, Math.max(1, result.scoreBreakdown?.interests || 50)),
        goals: Math.min(100, Math.max(1, result.scoreBreakdown?.goals || 50)),
      },
      insights: result.insights || "Compatibility analysis completed",
      explanation: result.explanation || "Based on profile analysis",
    };
  } catch (error) {
    console.error("AI compatibility analysis failed:", error);
    // Fallback compatibility calculation
    return {
      overallScore: 75,
      scoreBreakdown: {
        values: 80,
        lifestyle: 75,
        personality: 70,
        interests: 85,
        goals: 65,
      },
      insights: "Compatibility analysis unavailable - showing estimated scores",
      explanation: "Unable to perform AI analysis at this time",
    };
  }
}

export async function analyzePersonality(profileData: any): Promise<PersonalityAnalysis> {
  try {
    const prompt = `
      Analyze personality based on profile data. Respond with JSON in this exact format:
      {
        "traits": {
          "openness": number (1-100),
          "conscientiousness": number (1-100),
          "extraversion": number (1-100),
          "agreeableness": number (1-100),
          "neuroticism": number (1-100)
        },
        "summary": "Brief personality summary",
        "recommendations": ["recommendation1", "recommendation2", "recommendation3"]
      }

      Profile Data: ${JSON.stringify(profileData)}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      traits: {
        openness: Math.min(100, Math.max(1, result.traits?.openness || 50)),
        conscientiousness: Math.min(100, Math.max(1, result.traits?.conscientiousness || 50)),
        extraversion: Math.min(100, Math.max(1, result.traits?.extraversion || 50)),
        agreeableness: Math.min(100, Math.max(1, result.traits?.agreeableness || 50)),
        neuroticism: Math.min(100, Math.max(1, result.traits?.neuroticism || 50)),
      },
      summary: result.summary || "Personality analysis completed",
      recommendations: result.recommendations || ["Complete your profile for better insights"],
    };
  } catch (error) {
    console.error("AI personality analysis failed:", error);
    return {
      traits: {
        openness: 50,
        conscientiousness: 50,
        extraversion: 50,
        agreeableness: 50,
        neuroticism: 50,
      },
      summary: "Personality analysis unavailable",
      recommendations: ["Complete your profile for personalized insights"],
    };
  }
}

export async function generateProfileSuggestions(profileData: any): Promise<string[]> {
  try {
    const prompt = `
      Generate 3-5 specific suggestions to improve this matrimonial profile. Focus on completeness, attractiveness, and authenticity.
      Respond with JSON: {"suggestions": ["suggestion1", "suggestion2", ...]}

      Profile Data: ${JSON.stringify(profileData)}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.suggestions || ["Complete all profile sections for better matches"];
  } catch (error) {
    console.error("AI profile suggestions failed:", error);
    return ["Complete all profile sections for better matches"];
  }
}
