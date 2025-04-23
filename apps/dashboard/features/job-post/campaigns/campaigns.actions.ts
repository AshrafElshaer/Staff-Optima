"use server";
import { authActionClient } from "@/lib/safe-action";
import {
	createJobCampaign,
	updateJobCampaign,
	updateJobPost,
} from "@optima/supabase/mutations";
import { jobPostCampaignInsertSchema } from "@optima/supabase/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import moment from "moment";
import { jobPostCampaignStatusEnum } from "@optima/supabase/types";

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
				`status.eq.${jobPostCampaignStatusEnum.active},status.eq.${jobPostCampaignStatusEnum.scheduled}`,
			);

		if (runningCampaign?.length) {
			const campaign = runningCampaign[0];
			if (campaign?.status === "active" || campaign?.status === "scheduled") {
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
			status: "active",
		});

		if (jobPostError) {
			throw new Error(jobPostError.message);
		}
		revalidatePath(`/jobs/${parsedInput.job_post_id}/campaigns`);
		revalidatePath("/jobs");
		return data;
	});
