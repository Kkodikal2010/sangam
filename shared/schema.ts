import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  lastLoginAt: timestamp("last_login_at"),
});

export const profiles = pgTable("profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  age: integer("age").notNull(),
  gender: text("gender").notNull(), // 'male', 'female', 'other'
  religion: text("religion"),
  caste: text("caste"),
  motherTongue: text("mother_tongue"),
  height: integer("height"), // in cm
  weight: integer("weight"), // in kg
  education: text("education"),
  occupation: text("occupation"),
  income: decimal("income"),
  location: text("location"),
  bio: text("bio"),
  photos: jsonb("photos").$type<string[]>().default([]),
  interests: jsonb("interests").$type<string[]>().default([]),
  values: jsonb("values").$type<string[]>().default([]),
  lifestyle: jsonb("lifestyle").$type<Record<string, any>>().default({}),
  personalityTraits: jsonb("personality_traits").$type<Record<string, number>>().default({}),
  partnerPreferences: jsonb("partner_preferences").$type<Record<string, any>>().default({}),
  profileCompleteness: integer("profile_completeness").default(0),
  isActive: boolean("is_active").default(true),
  verificationStatus: text("verification_status").default("pending"), // 'pending', 'verified', 'rejected'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const matches = pgTable("matches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  matchedUserId: varchar("matched_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  compatibilityScore: integer("compatibility_score").notNull(),
  scoreBreakdown: jsonb("score_breakdown").$type<Record<string, number>>().default({}),
  aiInsights: text("ai_insights"),
  status: text("status").default("suggested"), // 'suggested', 'interested', 'mutual', 'passed'
  createdAt: timestamp("created_at").defaultNow(),
});

export const interests = pgTable("interests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fromUserId: varchar("from_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  toUserId: varchar("to_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: text("status").default("pending"), // 'pending', 'accepted', 'declined'
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  sentInterests: many(interests, { relationName: "sentInterests" }),
  receivedInterests: many(interests, { relationName: "receivedInterests" }),
  matches: many(matches, { relationName: "userMatches" }),
  matchedWith: many(matches, { relationName: "matchedWithUsers" }),
}));

export const profileRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

export const matchRelations = relations(matches, ({ one }) => ({
  user: one(users, {
    fields: [matches.userId],
    references: [users.id],
    relationName: "userMatches",
  }),
  matchedUser: one(users, {
    fields: [matches.matchedUserId],
    references: [users.id],
    relationName: "matchedWithUsers",
  }),
}));

export const interestRelations = relations(interests, ({ one }) => ({
  fromUser: one(users, {
    fields: [interests.fromUserId],
    references: [users.id],
    relationName: "sentInterests",
  }),
  toUser: one(users, {
    fields: [interests.toUserId],
    references: [users.id],
    relationName: "receivedInterests",
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  lastLoginAt: true,
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMatchSchema = createInsertSchema(matches).omit({
  id: true,
  createdAt: true,
});

export const insertInterestSchema = createInsertSchema(interests).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Match = typeof matches.$inferSelect;
export type InsertMatch = z.infer<typeof insertMatchSchema>;
export type Interest = typeof interests.$inferSelect;
export type InsertInterest = z.infer<typeof insertInterestSchema>;

// Extended types for API responses
export type UserWithProfile = User & {
  profile?: Profile;
};

export type MatchWithProfile = Match & {
  matchedUser: User & {
    profile: Profile;
  };
};
