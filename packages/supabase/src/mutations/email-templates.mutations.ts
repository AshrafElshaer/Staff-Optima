// import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

// type EmailTemplateInsert = TablesInsert<"email_templates">;
// type EmailTemplateUpdate = TablesUpdate<"email_templates">;

// export const createEmailTemplate = async (
//   supabase: SupabaseInstance,
//   emailTemplate: EmailTemplateInsert,
// ) => {
//   return await supabase
//     .from("email_templates")
//     .insert(emailTemplate)
//     .select()
//     .single();
// };

// export const updateEmailTemplate = async (
//   supabase: SupabaseInstance,
//   emailTemplate: EmailTemplateUpdate,
// ) => {
//   const { id, ...rest } = emailTemplate;
//   if (!id) {
//     throw new Error("Email template ID is required");
//   }
//   return await supabase
//     .from("email_templates")
//     .update(rest)
//     .eq("id", id)
//     .select()
//     .single();
// };

// export const deleteEmailTemplate = async (
//   supabase: SupabaseInstance,
//   id: string,
// ) => {
//   if (!id) {
//     throw new Error("Email template ID is required");
//   }
//   return await supabase.from("email_templates").delete().eq("id", id);
// };
