import type { Department, SupabaseInstance } from "../types";

export async function getDepartmentsByCompanyId(
	supabase: SupabaseInstance,
	companyId: string,
) {
	return await supabase
		.from("departments")
		.select("*")
		.eq("company_id", companyId);
}

export async function getDepartmentsWithJobsAndApplications(
	supabase: SupabaseInstance,
	companyId: string,
	filters?: {
		name?: string;
	},
) {
	// job_posts(*), applications:applications(*)
	const query = supabase
		.from("departments")
		.select("*")
		.eq("company_id", companyId);

	if (filters?.name) {
		query.ilike("name", `%${filters.name}%`);
	}

	return await query;
}

export async function getDepartmentById(
	supabase: SupabaseInstance,
	id: string,
) {
	return await supabase.from("departments").select("*").eq("id", id).single();
}
