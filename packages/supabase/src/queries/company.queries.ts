import type { SupabaseInstance } from "../types";

export async function getCompanyById(supabase: SupabaseInstance, id: string) {
	return supabase.from("companies").select("*").eq("id", id).single();
}

export async function getCompanyByDomain(
	supabase: SupabaseInstance,
	domain: string,
) {
	return supabase.from("companies").select("*").eq("domain", domain);
}

export async function getDomainVerificationByToken(
	supabase: SupabaseInstance,
	token: string,
) {
	return supabase
		.from("domain_verification")
		.select("*")
		.eq("verification_token", token)
		.single();
}

export async function getDomainVerificationByCompanyId(
	supabase: SupabaseInstance,
	companyId: string,
) {
	return supabase
		.from("domain_verification")
		.select("*")
		.eq("company_id", companyId)
		.single();
}

export async function getCompanyRoles(
	supabase: SupabaseInstance,
	company_id: string,
) {
	return await supabase
		.from("roles")
		.select("*")
		.order("created_at", { ascending: true })
		.eq("company_id", company_id);
}
