import { env } from "@/env.mjs";
import { resend } from "@/lib/resend";
import { stripe } from "@better-auth/stripe";
import { db } from "@optima/database";
import * as schema from "@optima/database/schema";
import { OtpEmail } from "@optima/email";
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
import Stripe from "stripe";
import { adminPlugin } from "./plugins/admin";
import { stripePlugin } from "./plugins/stripe";

// Only initialize Stripe if we have the secret key
const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
	apiVersion: "2025-02-24.acacia", // Add specific API version
});

export const auth = betterAuth({
	baseUrl: env.NEXT_PUBLIC_BETTER_AUTH_URL,
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
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
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
	},
	advanced: {
		generateId: () => crypto.randomUUID(),
		ipAddress: {
			disableIpTracking: true,
		},
	},
	authenticator: {
		secret: env.BETTER_AUTH_SECRET || crypto.randomUUID(),
	},
	plugins: [
		stripePlugin,
		multiSession(),
		adminPlugin,
		emailOTP({
			expiresIn: 1000 * 60 * 10, // 10 minutes
			otpLength: 6,
			sendVerificationOnSignUp: true,
			async sendVerificationOTP({ email, otp, type }, request) {
				await resend.emails.send({
					from: "Staff Optima <access@staffoptima.co>",
					to: email,
					subject: "Staff Optima OTP Access",
					react: OtpEmail({ otpCode: otp }),
					headers: {
						"X-Entity-Ref-ID": email,
					},
				});
			},
		}),
		nextCookies(),
	],
});
