import { randomBytes } from "node:crypto";
import { PERMISSIONS_ARRAY } from "@optima/constants";
import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";
import { createUserRole } from "./user.mutations";

type CompanyInsert = TablesInsert<"companies">;
type CompanyUpdate = TablesUpdate<"companies">;
type DomainVerificationInsert = TablesInsert<"domain_verification">;
type DomainVerificationUpdate = TablesUpdate<"domain_verification">;

export async function createCompany(
	supabase: SupabaseInstance,
	data: CompanyInsert,
) {
	const { data: company, error: companyError } = await supabase
		.from("companies")
		.insert(data)
		.select()
		.single();

	if (companyError) {
		return {
			data: null,
			error: companyError,
		};
	}

	const { error: memberError } = await supabase.from("company_members").insert({
		company_id: company.id || "",
		user_id: company.admin_id || "",
	});

	if (memberError) {
		return {
			data: null,
			error: memberError,
		};
	}

	const { data: role, error: userError } = await createRole(supabase, {
		name: "Owner",
		company_id: company.id,
		permissions: [...PERMISSIONS_ARRAY],
	});

	if (userError) {
		return {
			data: null,
			error: userError,
		};
	}

	const { error: roleError } = await createUserRole(supabase, {
		user_id: company.admin_id || "",
		role_id: role.id || "",
		company_id: company.id,
	});

	if (roleError) {
		return {
			data: null,
			error: roleError,
		};
	}

	await supabase.auth.updateUser({
		data: {
			company_id: company.id,
		},
	});

	return {
		data: company,
		error: null,
	};
}

export async function updateCompany(
	supabase: SupabaseInstance,
	data: CompanyUpdate,
) {
	if (!data.id) {
		return {
			data: null,
			error: new Error("Company id is required"),
		};
	}

	if (data.domain) {
		await supabase
			.from("domain_verification")
			.update({
				domain: data.domain,
				verification_token: randomBytes(16).toString("hex"),
				verification_status: "pending",
				verification_date: null,
			})
			.eq("company_id", data.id)
			.select()
			.single();

		data.is_domain_verified = false;
	}

	return await supabase
		.from("companies")
		.update(data)
		.eq("id", data.id)
		.select()
		.single();
}

export async function deleteCompany(
	supabase: SupabaseInstance,
	companyId: string,
) {
	return supabase
		.from("companies")
		.delete()
		.eq("id", companyId)
		.select()
		.single();
}

export async function createDomainVerification(
	supabase: SupabaseInstance,
	data: DomainVerificationInsert,
) {
	return supabase.from("domain_verification").insert(data).select().single();
}

export async function updateDomainVerification(
	supabase: SupabaseInstance,
	data: DomainVerificationUpdate,
) {
	if (!data.id) {
		throw new Error("Domain verification id is required");
	}
	return supabase
		.from("domain_verification")
		.update(data)
		.eq("id", data.id)
		.select()
		.single();
}

export async function createRole(
	supabase: SupabaseInstance,
	data: TablesInsert<"roles">,
) {
	return supabase.from("roles").insert(data).select().single();
}

export async function updateRole(
	supabase: SupabaseInstance,
	data: TablesUpdate<"roles">,
) {
	if (!data.id) {
		throw new Error("Role id is required");
	}
	return supabase
		.from("roles")
		.update(data)
		.eq("id", data.id)
		.select()
		.single();
}

export async function updateBulkRoles(
	supabase: SupabaseInstance,
	roles: Required<
		Pick<TablesUpdate<"roles">, "id" | "name" | "company_id" | "permissions">
	>[],
) {
	return await supabase.from("roles").upsert(roles).select();
}

export async function deleteRole(supabase: SupabaseInstance, roleId: string) {
	return supabase.from("roles").delete().eq("id", roleId).select().single();
}
