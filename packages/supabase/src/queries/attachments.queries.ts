import type { SupabaseInstance } from "../types";

export async function getAttachmentsByApplicationId(
	supabase: SupabaseInstance,
	applicationId: string,
) {
	return await supabase
		.from("attachments")
		.select("*")
		.eq("application_id", applicationId);
}
