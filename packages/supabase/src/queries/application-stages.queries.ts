import type { SupabaseInstance } from "../types";

export async function getApplicationStages(
	supabase: SupabaseInstance,
	companyId: string,
) {
	return await supabase
		.from("application_stages")
		.select("*")
		.eq("company_id", companyId)
		.order("stage_order", { ascending: true });
}
