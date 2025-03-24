// import type { SupabaseInstance } from "../types";

// export async function getEmailTemplates(
//   supabase: SupabaseInstance,
//   organization_id: string,
// ) {
//   const { data, error } = await supabase
//     .from("email_templates")
//     .select("*")
//     .eq("organization_id", organization_id);
//   if (error) {
//     throw new Error(error.message);
//   }
//   return data;
// }

// export async function getEmailTemplateById(
//   supabase: SupabaseInstance,
//   id: string,
// ) {
//   return await supabase
//     .from("email_templates")
//     .select("*")
//     .eq("id", id)
//     .single();
// }
