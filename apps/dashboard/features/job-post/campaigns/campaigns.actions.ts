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
import {
	jobPostCampaignInsertSchema,
	jobPostCampaignUpdateSchema,
} from "@optima/supabase/validations";
import type { completeJobCampaign } from "@optima/trigger.dev/complete-job-campaign";
import { tasks } from "@trigger.dev/sdk/v3";
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
			end_date: moment(parsedInput.end_date).toISOString(),
			start_date: moment(parsedInput.start_date).toISOString(),
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

export const updateCampaignAction = authActionClient
	.metadata({
		name: "Update Campaign",
	})
	.schema(jobPostCampaignUpdateSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { supabase } = ctx;

		const { data, error } = await updateJobCampaign(supabase, {
			...parsedInput,
			id: parsedInput.id,
			updated_at: moment().toISOString(),
		});

		if (error) {
			throw new Error(error.message);
		}

		revalidatePath(`/jobs/${data.job_post_id}/campaigns`);
		revalidatePath("/jobs");
		return data;
	});

export const completeCampaignAction = authActionClient
	.metadata({
		name: "Pause Campaign",
	})
	.schema(
		z.object({
			jobPostId: z.string(),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { id } = await tasks.trigger<typeof completeJobCampaign>(
			"complete-job-campaign",
			{
				jobPostId: parsedInput.jobPostId,
			},
		);

		revalidatePath(`/jobs/${parsedInput.jobPostId}/campaigns`);
		revalidatePath("/jobs");
		return id;
	});
