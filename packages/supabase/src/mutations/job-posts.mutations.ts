// import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

// export async function createJobPost(
//   supabase: SupabaseInstance,
//   data: TablesInsert<"job_posts">,
// ) {
//   return await supabase.from("job_posts").insert(data).select().single();
// }

// export async function updateJobPost(
//   supabase: SupabaseInstance,
//   data: TablesUpdate<"job_posts">,
// ) {
//   if (!data.id) throw new Error("Job post id is required");

//   return await supabase
//     .from("job_posts")
//     .update(data)
//     .eq("id", data.id)
//     .select()
//     .single();
// }
