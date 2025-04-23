"use server";
import { authActionClient } from "@/lib/safe-action";
import {
	createJobCampaign,
	updateJobCampaign,
	updateJobPost,
} from "@optima/supabase/mutations";
import {
	jobPostCampaignStatusEnum,
	jobPostStatusEnum,
} from "@optima/supabase/types";
import { jobPostCampaignInsertSchema } from "@optima/supabase/validations";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const launchCampaignAction = authActionClient
	.metadata({
		name: "Launch Campaign",
	})
	.schema(jobPostCampaignInsertSchema.omit({ company_id: true }))
	.action(async ({ parsedInput, ctx }) => {
		const { user, supabase } = ctx;

		const { data: runningCampaign } = await supabase
			.from("job_posts_campaigns")
			.select("*")
			.eq("company_id", user.user_metadata.company_id)
			.eq("job_post_id", parsedInput.job_post_id)
			.or(
				`status.eq.${jobPostCampaignStatusEnum.running},status.eq.${jobPostCampaignStatusEnum.scheduled}`,
			);

		if (runningCampaign?.length) {
			const campaign = runningCampaign[0];
			if (
				campaign?.status === jobPostCampaignStatusEnum.running ||
				campaign?.status === jobPostCampaignStatusEnum.scheduled
			) {
				throw new Error("Job post already has an active or scheduled campaign");
			}
		}

		const { data, error } = await createJobCampaign(supabase, {
			...parsedInput,
			company_id: user.user_metadata.company_id,
			end_date: parsedInput.end_date?.toISOString(),
			start_date: parsedInput.start_date.toISOString(),
		});

		if (error) {
			throw new Error(error.message);
		}
		const { error: jobPostError } = await updateJobPost(supabase, {
			id: parsedInput.job_post_id,
			status: jobPostStatusEnum.published,
		});

		if (jobPostError) {
			throw new Error(jobPostError.message);
		}
		revalidatePath(`/jobs/${parsedInput.job_post_id}/campaigns`);
		revalidatePath("/jobs");
		return data;
	});
