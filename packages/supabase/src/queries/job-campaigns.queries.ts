import type { SupabaseInstance } from "../types";

export async function getJobCampaigns(
	supabase: SupabaseInstance,
	companyId: string,
) {
	return await supabase
		.from("job_posts_campaigns")
		.select("*")
		.eq("company_id", companyId);
}

export async function getJobCampaignsByJobId(
	supabase: SupabaseInstance,
	jobId: string,
) {
	return await supabase
		.from("job_posts_campaigns")
		.select("*")
		.eq("job_post_id", jobId)
		.order("created_at", { ascending: false });
}

export async function getJobCampaignById(
	supabase: SupabaseInstance,
	campaignId: string,
) {
	return await supabase
		.from("job_posts_campaigns")
		.select("*")
		.eq("id", campaignId)
		.single();
}
