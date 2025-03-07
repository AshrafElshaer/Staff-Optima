import { db } from "@optima/database";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import {
	admin,
	emailOTP,
	multiSession,
	organization,
} from "better-auth/plugins";
import { adminPlugin } from "./plugins/admin";

export const auth = betterAuth({
	baseUrl: process.env.VERCEL_URL || "http://localhost:3000",
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	appName: "Staff Optima",
	user: {
		additionalFields: {
			phoneNumber: {
				type: "string",
				required: false,
				input: true,
			},
		},
		changeEmail: {
			enabled: true,
			async sendChangeEmailVerification(data, request) {
				// Send email with verification url
			},
		},
	},
	advanced: {
		crossSubDomainCookies: {
			enabled: true,
			domains: [
				"staffoptima.co",
				"platform.staffoptima.co",
				"http://localhost:3000",
			],
			domain: process.env.VERCEL_URL || "http://localhost:3000",

		},
		generateId: () => crypto.randomUUID(),
	},
	plugins: [
		multiSession(),
		adminPlugin,
		emailOTP({
			expiresIn: 1000 * 60 * 10, // 10 minutes
			otpLength: 6,
			async sendVerificationOTP({ email, otp, type }, request) {
				// Send email with OTP
			},
		}),
		nextCookies(),
	],
});
