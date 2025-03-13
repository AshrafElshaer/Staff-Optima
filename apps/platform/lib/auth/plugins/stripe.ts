import { stripe } from "@better-auth/stripe";

import { env } from "@/env.mjs";
import Stripe from "stripe";

const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
	apiVersion: "2025-02-24.acacia", // Add specific API version
});

export const stripePlugin = stripe({
	id: "stripe",
	stripeClient,
	stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET as string,
	createCustomerOnSignUp: true,
	subscription: {
		enabled: true,
		plans: [
			{
				name: "User Seat",
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
});
