import { stripe } from "@better-auth/stripe";
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
import Stripe from "stripe";
import { adminPlugin } from "./plugins/admin";
import { env } from "@/env.mjs";

// Only initialize Stripe if we have the secret key
const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
	apiVersion: "2025-02-24.acacia", // Add specific API version
});

export const auth = betterAuth({
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
			domain: env.VERCEL_URL || "http://localhost:3000",
		},
		generateId: () => crypto.randomUUID(),
	},
	authenticator: {
		secret: env.BETTER_AUTH_SECRET || crypto.randomUUID(),
	},
	plugins: [
		// Only add stripe plugin if we have a client
		...(stripeClient
			? [
					stripe({
						stripeClient,
						stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET as string,
						createCustomerOnSignUp: true,
						subscription: {
							enabled: true,
							plans: [
								{
									name: "Seat",
									freeTrial: {
										days: 30,
										async onTrialStart(subscription) {
											console.log(subscription);
										},
										async onTrialEnd(data) {
											console.log(data);
										},
										async onTrialExpired(subscription) {
											console.log(subscription);
										},
									},
								},
							],
						},
					}),
				]
			: []),
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
