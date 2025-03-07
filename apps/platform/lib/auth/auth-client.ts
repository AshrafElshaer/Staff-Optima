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
	baseURL: process.env.VERCEL_URL || "http://localhost:3000",
	plugins: [
		inferAdditionalFields<typeof auth>(),
		emailOTPClient(),
		adminClient(),
		multiSessionClient(),
	],
});
