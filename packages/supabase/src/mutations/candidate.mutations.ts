// import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

// export const createCandidate = async (
//   supabase: SupabaseInstance,
//   candidate: TablesInsert<"candidates">,
// ) => {
//   const { data: existingCandidate, error } = await supabase
//     .from("candidates")
//     .select("*")
//     .eq("email", candidate.email)
//     .eq("organization_id", candidate.organization_id ?? "")
//     .single();

//   if (existingCandidate) {
//     const { data, error } = await supabase
//       .from("candidates")
//       .update(candidate)
//       .eq("email", candidate.email)
//       .eq("organization_id", candidate.organization_id ?? "")
//       .select()
//       .single();

//     return {
//       data,
//       error,
//     };
//   }
//   return await supabase.from("candidates").insert(candidate).select().single();
// };

// export const updateCandidate = async (
//   supabase: SupabaseInstance,
//   candidate: TablesUpdate<"candidates">,
// ) => {
//   if (!candidate.id) {
//     throw new Error("Candidate ID is required");
//   }

//   return await supabase
//     .from("candidates")
//     .update(candidate)
//     .eq("id", candidate.id)
//     .select()
//     .single();
// };
