import type { SupabaseInstance } from "../types";

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
	const query = supabase
		.from("departments")
		.select("*, job_posts(*), applications:applications(*)")
		.eq("organization_id", organizationId);

	if (filters?.name) {
		query.ilike("name", `%${filters.name}%`);
	}

	return await query.returns<
		{
			id: string;
			name: string;
			description: string | null;
			head_user_id: string | null;
			created_at: string | null;
			updated_at: string | null;
			job_posts: {
				id: string;
				title: string;
				created_at: string | null;
				updated_at: string | null;
			}[];
			applications: {
				id: string;
				user_id: string;
				created_at: string | null;
				updated_at: string | null;
			}[];
		}[]
	>();
}

export async function getDepartmentById(
	supabase: SupabaseInstance,
	id: string,
) {
	return await supabase.from("departments").select("*").eq("id", id).single();
}
