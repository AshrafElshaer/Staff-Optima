// import { getUser } from "@optima/supabase/queries";
// import { createServerClient } from "@/lib/supabase/server";
import { setupAnalytics } from "@optima/analytics/server";
import { ratelimit } from "@optima/kv/ratelimit";
import { logger } from "@optima/logger";
// import * as Sentry from "@sentry/nextjs";
import {
	DEFAULT_SERVER_ERROR_MESSAGE,
	createSafeActionClient,
} from "next-safe-action";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "./auth/auth";
import { resend } from "./resend";

const handleServerError = (e: Error) => {
	console.error("Action error:", e.message);

	if (e instanceof Error) {
		return e.message;
	}

	return DEFAULT_SERVER_ERROR_MESSAGE;
};

export const actionClient = createSafeActionClient({
	handleServerError,
});

export const actionClientWithMeta = createSafeActionClient({
	handleServerError,
	defineMetadataSchema() {
		return z.object({
			name: z.string(),
			track: z
				.object({
					event: z.string(),
					channel: z.string(),
				})
				.optional(),
		});
	},
});

export const authActionClient = actionClientWithMeta
	.use(async ({ next, clientInput, metadata }) => {
		const result = await next({
			ctx: {
				resend,
			},
		});

		// if (process.env.NODE_ENV === "development") {
		//   logger.info(`Input -> ${JSON.stringify(clientInput)}`);
		//   logger.info(`Result -> ${JSON.stringify(result.data)}`);
		//   logger.info(`Metadata -> ${JSON.stringify(metadata)}`);

		//   return result;
		// }

		return result;
	})
	.use(async ({ next, metadata }) => {
		const ip = (await headers()).get("x-forwarded-for");

		const { success, remaining } = await ratelimit.limit(
			`${ip}-${metadata.name}`,
		);

		if (!success) {
			throw new Error("Too many requests");
		}

		return next({
			ctx: {
				ratelimit: {
					remaining,
				},
			},
		});
	})
	.use(async ({ next, metadata }) => {
		const session = await auth.api.getSession({
			headers: await headers(), // you need to pass the headers object.
		});

		if (!session) {
			throw new Error("Unauthorized");
		}

		if (metadata) {
			const analytics = await setupAnalytics({
				userId: session.user.id,
			});
			if (metadata.track) {
				analytics.track(metadata.track);
			}
		}

		return next({
			ctx: {
				user: session.user,
			},
		});

		// return Sentry.withServerActionInstrumentation(metadata.name, async () => {
		//   return next({
		//     ctx: {
		//       supabase,
		//       user,
		//     },
		//   });
		// });
	});
