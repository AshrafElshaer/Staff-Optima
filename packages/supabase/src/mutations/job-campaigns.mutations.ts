// import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

// export const createJobCampaign = async (
//   supabase: SupabaseInstance,
//   data: TablesInsert<"job_posts_campaigns">,
// ) => {
//   return await supabase
//     .from("job_posts_campaigns")
//     .insert(data)
//     .select()
//     .single();
// };

// export const updateJobCampaign = async (
//   supabase: SupabaseInstance,
//   data: TablesUpdate<"job_posts_campaigns">,
// ) => {
//   if (!data.job_id) {
//     throw new Error("job_id is required");
//   }
//   return await supabase
//     .from("job_posts_campaigns")
//     .update(data)
//     .eq("job_id", data.job_id)
//     .select()
//     .single();
// };
