import type { Department, SupabaseInstance } from "../types";

export async function getDepartmentsByOrganizationId(
	supabase: SupabaseInstance,
	organizationId: string,
) {
	return await supabase
		.from("departments")
		.select("*")
		.eq("organization_id", organizationId);
}

export async function getDepartmentsWithJobsAndApplications(
	supabase: SupabaseInstance,
	organizationId: string,
	filters?: {
		name?: string;
	},
) {
	// job_posts(*), applications:applications(*)
	const query = supabase
		.from("departments")
		.select("*")
		.eq("organization_id", organizationId);

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
