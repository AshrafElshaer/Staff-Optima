// import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

// export const createApplication = async (
//   supabase: SupabaseInstance,
//   application: TablesInsert<"applications">,
// ) => {
//   const { data: existingApplications, error } = await supabase
//     .from("applications")
//     .select("*")
//     .eq("job_id", application.job_id)
//     .eq("candidate_id", application.candidate_id)
//     .eq("organization_id", application.organization_id);

//   if (error) {
//     throw new Error(error.message);
//   }

//   if (existingApplications && existingApplications.length > 0) {
//     throw new Error("You already applied for this job");
//   }

//   return await supabase
//     .from("applications")
//     .insert(application)
//     .select()
//     .single();
// };

// export const updateApplication = async (
//   supabase: SupabaseInstance,
//   application: TablesUpdate<"applications">,
// ) => {
//   if (!application.id) {
//     throw new Error("Application ID is required");
//   }

//   return await supabase
//     .from("applications")
//     .update(application)
//     .eq("id", application.id)
//     .select()
//     .single();
// };
