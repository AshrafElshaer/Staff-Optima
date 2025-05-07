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

export async function getApplicationStageById(
	supabase: SupabaseInstance,
	applicationStageId: string,
) {
	return await supabase
		.from("application_stages")
		.select("*")
		.eq("id", applicationStageId);
}

export async function getApplicationStageByStageOrder(
	supabase: SupabaseInstance,
	companyId: string,
	stageOrder: number,
) {
	return await supabase
		.from("application_stages")
		.select("*")
		.eq("company_id", companyId)
		.eq("stage_order", stageOrder)
		.single();
}
