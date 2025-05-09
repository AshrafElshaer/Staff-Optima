import { PermissionGuard } from "@/features/auth/views/permission-gaurd";
import NewRole from "@/features/company/roles-and-permissions/views/new-role";
import { RolesTable } from "@/features/company/roles-and-permissions/views/roles-table";
import { createServerClient } from "@/lib/supabase/server";
import { getCompanyRoles } from "@optima/supabase/queries";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
	title: "Roles & Permissions",
	description: "Manage Company Roles & Access",
};
export default async function AccessControlPage() {
	const supabase = await createServerClient();
	const headersList = await headers();
	const company_id = headersList.get("x-company-id");
	const { data: roles } = await getCompanyRoles(supabase, company_id ?? "");
	return (
		<div className="flex flex-col gap-4 flex-1">
			<PermissionGuard requiredPermissions={["settings:roles"]}>
				<NewRole />
			</PermissionGuard>
			{!roles ? (
				<div className="flex-1 flex justify-center items-center">
					<h3>No roles found start by creating new role</h3>
				</div>
			) : (
				<RolesTable roles={roles} />
			)}
		</div>
	);
}
