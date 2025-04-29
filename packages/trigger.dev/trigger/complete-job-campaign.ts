import type { Database } from "@optima/supabase/types";
import { createClient } from "@supabase/supabase-js";
import { AbortTaskRunError, envvars, logger, task } from "@trigger.dev/sdk/v3";

type CompleteJobCampaignPayload = {
	jobPostId: string;
};

export const completeJobCampaign = task({
	id: "complete-job-campaign",
	run: async (payload: CompleteJobCampaignPayload, { ctx }) => {
		logger.log("Completing job campaign", { payload, ctx });
		const SUPABASE_URL = await envvars.retrieve("SUPABASE_URL");
		const SUPABASE_SERVICE_ROLE_KEY = await envvars.retrieve(
			"SUPABASE_SERVICE_ROLE_KEY",
		);

		if (!SUPABASE_URL.value || !SUPABASE_SERVICE_ROLE_KEY.value) {
			throw new AbortTaskRunError(
				"SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set",
			);
		}

		const supabase = createClient<Database>(
			SUPABASE_URL.value,
			SUPABASE_SERVICE_ROLE_KEY.value,
		);

		const { data, error } = await supabase
			.from("job_posts_campaigns")
			.update({
				status: "completed",
				updated_at: new Date().toISOString(),
				end_date: new Date().toISOString(),
			})
			.eq("job_post_id", payload.jobPostId)
			.eq("status", "running")
			.select()
			.single();
		if (error) {
			logger.error("Error completing job campaign", { error });
			throw new Error(error.message);
		}

		if (!data) {
			logger.error("Job campaign not found");
			throw new Error("Job campaign not found");
		}

		// TODO: Check if the integrated apps are enabled and if so, launch the job campaign on the integrated apps
		return {
			message: "Job campaign completed",
		};
	},
});
