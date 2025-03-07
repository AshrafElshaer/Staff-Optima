import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
	id: uuid("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
	role: text("role"),
	banned: boolean("banned"),
	banReason: text("ban_reason"),
	banExpires: timestamp("ban_expires"),
	phoneNumber: text("phone_number"),
});

export const SessionTable = pgTable("session", {
	id: uuid("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: uuid("user_id")
		.notNull()
		.references(() => UserTable.id, { onDelete: "cascade" }),
	impersonatedBy: text("impersonated_by"),
});

export const AccountTable = pgTable("account", {
	id: uuid("id").primaryKey(),
	accountId: uuid("account_id").notNull(),
	providerId: uuid("provider_id").notNull(),
	userId: uuid("user_id")
		.notNull()
		.references(() => UserTable.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const VerificationTable = pgTable("verification", {
	id: uuid("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
