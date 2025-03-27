import { randomBytes } from "node:crypto";
import { PERMISSIONS_ARRAY } from "@optima/constants";
import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";
import { createUserRole } from "./user.mutations";

type OrganizationInsert = TablesInsert<"organizations">;
type OrganizationUpdate = TablesUpdate<"organizations">;
type DomainVerificationInsert = TablesInsert<"domain_verification">;
type DomainVerificationUpdate = TablesUpdate<"domain_verification">;
export async function createOrganization(
	supabase: SupabaseInstance,
	data: OrganizationInsert,
) {
	const { data: organization, error: organizationError } = await supabase
		.from("organizations")
		.insert(data)
		.select()
		.single();

	if (organizationError) {
		return {
			data: null,
			error: organizationError,
		};
	}

	const { error: memberError } = await supabase
		.from("organization_members")
		.insert({
			organization_id: organization.id || "",
			user_id: organization.admin_id || "",
		});

	if (memberError) {
		return {
			data: null,
			error: memberError,
		};
	}

	const { data: role, error: userError } = await createRole(supabase, {
		name: "Owner",
		organization_id: organization.id,
		permissions: [...PERMISSIONS_ARRAY],
	});

	if (userError) {
		return {
			data: null,
			error: userError,
		};
	}

	const { error: roleError } = await createUserRole(supabase, {
		user_id: organization.admin_id || "",
		role_id: role.id || "",
	});

	if (roleError) {
		return {
			data: null,
			error: roleError,
		};
	}

	await supabase.auth.updateUser({
		data: {
			organization_id: organization.id,
		},
	});

	return {
		data: organization,
		error: null,
	};
}

export async function updateOrganization(
	supabase: SupabaseInstance,
	data: OrganizationUpdate,
) {
	if (!data.id) {
		return {
			data: null,
			error: new Error("Organization id is required"),
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
			.eq("organization_id", data.id)
			.select()
			.single();

		data.is_domain_verified = false;
	}

	return await supabase
		.from("organizations")
		.update(data)
		.eq("id", data.id)
		.select()
		.single();
}

export async function deleteOrganization(
	supabase: SupabaseInstance,
	organizationId: string,
) {
	return supabase
		.from("organizations")
		.delete()
		.eq("id", organizationId)
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
		Pick<
			TablesUpdate<"roles">,
			"id" | "name" | "organization_id" | "permissions"
		>
	>[],
) {
	return await supabase.from("roles").upsert(roles).select();
}

export async function deleteRole(supabase: SupabaseInstance, roleId: string) {
	return supabase.from("roles").delete().eq("id", roleId).select().single();
}
