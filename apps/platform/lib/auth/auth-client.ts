import { env } from "@/env.mjs";
import { stripeClient } from "@better-auth/stripe/client";
import {
	adminClient,
	emailOTPClient,
	inferAdditionalFields,
	multiSessionClient,
	organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth.js";

export const authClient = createAuthClient({
	baseURL: env.VERCEL_URL || "http://localhost:3000",
	plugins: [
		inferAdditionalFields<typeof auth>(),
		emailOTPClient(),
		adminClient(),
		multiSessionClient(),
		stripeClient({
			subscription: true, //if you want to enable subscription management
		}),
	],
});
