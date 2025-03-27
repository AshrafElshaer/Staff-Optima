import type { SupabaseInstance } from "../types";

export async function getOrganizationById(
	supabase: SupabaseInstance,
	id: string,
) {
	return supabase.from("organizations").select("*").eq("id", id).single();
}

export async function getOrganizationByDomain(
	supabase: SupabaseInstance,
	domain: string,
) {
	return supabase.from("organizations").select("*").eq("domain", domain);
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

export async function getDomainVerificationByOrganizationId(
	supabase: SupabaseInstance,
	organizationId: string,
) {
	return supabase
		.from("domain_verification")
		.select("*")
		.eq("organization_id", organizationId)
		.single();
}

export async function getOrganizationRoles(
	supabase: SupabaseInstance,
	organization_id: string,
) {
	return await supabase
		.from("roles")
		.select("*")
		.order("created_at", { ascending: true })
		.eq("organization_id", organization_id);
}
