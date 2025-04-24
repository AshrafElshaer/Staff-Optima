import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { tasks } from "npm:@trigger.dev/sdk@3.0.0/v3";
import type { JobPostCampaign } from "../../src/types/index.ts";
import { jobPostCampaignStatusEnum } from "../_shared/enums.ts";
import { supabase } from "../_shared/supabase-client.ts";

function getTimeWindowQuery(hours = 1) {
	const now = new Date().toISOString();
	const futureWindow = new Date(
		Date.now() + hours * 60 * 60 * 1000,
	).toISOString();

	return {
		nowISO: now,
		futureISO: futureWindow,
	};
}

Deno.serve(async () => {
	const { nowISO, futureISO } = getTimeWindowQuery();
	const scheduledStatus = jobPostCampaignStatusEnum.scheduled;
	const runningStatus = jobPostCampaignStatusEnum.running;

	try {
		const { data: jobCampaigns, error } = (await supabase
			.from("job_posts_campaigns")
			.select("*")
			.or(
				`and(status.eq.${scheduledStatus},start_date.gte.${nowISO},start_date.lt.${futureISO}),and(status.eq.${runningStatus},end_date.gte.${nowISO},end_date.lt.${futureISO})`,
			)) as { data: JobPostCampaign[] | null; error: Error | null };

		if (error) throw error;
		if (!jobCampaigns)
			return new Response("No campaigns to process", { status: 200 });

		await Promise.all(
			jobCampaigns.map((campaign) => {
				const triggerPayload = {
					jobPostId: campaign.job_id,
				};
				if (campaign.status === scheduledStatus) {
					return tasks.trigger("launch-job-campaign", triggerPayload, {
						delay: new Date(campaign.start_date).toISOString(),
					});
				}

				if (campaign.status === runningStatus) {
					return tasks.trigger("complete-job-campaign", triggerPayload, {
						delay: new Date(campaign.end_date).toISOString(),
					});
				}
			}),
		);
		return new Response("Processed successfully", { status: 200 });
	} catch (error) {
		console.error("Error processing job campaigns:", error);
		return new Response("Error processing job campaigns", { status: 500 });
	}
});
