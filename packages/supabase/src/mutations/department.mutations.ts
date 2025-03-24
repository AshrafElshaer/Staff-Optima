import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

export async function createDepartment(
	supabase: SupabaseInstance,
	department: TablesInsert<"departments">,
) {
	return await supabase.from("departments").insert(department);
}

export async function updateDepartment(
	supabase: SupabaseInstance,
	department: TablesUpdate<"departments">,
) {
	if (!department.id) {
		throw new Error("Department ID is required");
	}

	return await supabase
		.from("departments")
		.update(department)
		.eq("id", department.id);
}

export async function deleteDepartment(supabase: SupabaseInstance, id: string) {
	return await supabase.from("departments").delete().eq("id", id);
}
