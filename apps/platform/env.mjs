import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	shared: {
		VERCEL_URL: z
			.string()
			.optional()
			.transform((v) => (v ? `https://${v}` : undefined)),
		PORT: z.coerce.number().default(3000),
	},
	server: {
		OPENPANEL_SECRET_KEY: z.string(),
		DATABASE_URL: z.string(),
		RESEND_API_KEY: z.string(),
		STRIPE_SECRET_KEY: z.string(),
		STRIPE_WEBHOOK_SECRET: z.string(),
		UPSTASH_REDIS_REST_TOKEN: z.string(),
		UPSTASH_REDIS_REST_URL: z.string(),
		BETTER_AUTH_SECRET: z.string(),
	},
	client: {
		NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url(),
		NEXT_PUBLIC_OPENPANEL_CLIENT_ID: z.string(),
		NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
		NEXT_PUBLIC_SUPABASE_URL: z.string(),
		NEXT_PUBLIC_OPENAI_API_KEY: z.string(),
		NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY: z.string(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_OPENPANEL_CLIENT_ID:
			process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID,
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		OPENPANEL_SECRET_KEY: process.env.OPENPANEL_SECRET_KEY,
		PORT: process.env.PORT,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
		UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
		UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
		VERCEL_URL: process.env.VERCEL_URL,
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
		DATABASE_URL: process.env.DATABASE_URL,
		NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
		NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY:
			process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
	},
	skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
