// import type { SupabaseInstance } from "../types";

// export async function getJobCampaigns(
//   supabase: SupabaseInstance,
//   organizationId: string,
// ) {
//   return await supabase
//     .from("job_posts_campaigns")
//     .select("*")
//     .eq("organization_id", organizationId);
// }

// export async function getJobCampaignsByJobId(
//   supabase: SupabaseInstance,
//   jobId: string,
// ) {
//   return await supabase
//     .from("job_posts_campaigns")
//     .select("*")
//     .eq("job_id", jobId);
// }

// export async function getJobCampaignById(
//   supabase: SupabaseInstance,
//   campaignId: string,
// ) {
//   return await supabase
//     .from("job_posts_campaigns")
//     .select("*")
//     .eq("id", campaignId)
//     .single();
// }
