import { PermissionGuard } from "@/components/permission-gaurd";
import NewRole from "@/features/organization/roles-and-permissions/views/new-role";
import { createServerClient } from "@/lib/supabase/server";
import { getOrganizationRoles } from "@optima/supabase/queries";
import type { Metadata } from "next";
import { headers } from "next/headers";
export const metadata: Metadata = {
	title: "Roles & Permissions",
	description: "Manage Organization Roles & Access",
};
export default async function AccessControlPage() {
	const supabase = await createServerClient();
	const headersList = await headers();
	const organization_id = headersList.get("x-organization-id");
	const { data: roles } = await getOrganizationRoles(
		supabase,
		organization_id ?? "",
	);
	return (
		<div className="flex flex-col gap-4">
			<PermissionGuard requiredPermissions={["settings:roles"]}>
				<NewRole />
			</PermissionGuard>
			<div className="flex flex-col gap-2">
				{roles?.map((role) => (
					<h1 key={role.id}>{role.name}</h1>
				))}
			</div>
		</div>
	);
}
