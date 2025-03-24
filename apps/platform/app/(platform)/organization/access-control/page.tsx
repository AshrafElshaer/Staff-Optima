import { createServerClient } from "@/lib/supabase/server";
import { getOrganizationRoles } from "@optima/supabase/queries";
import { headers } from "next/headers";

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
			<h1 className="text-2xl font-bold">Access Control</h1>
			<div className="flex flex-col gap-2">
				<pre>{JSON.stringify(roles, null, 2)}</pre>
			</div>
		</div>
	);
}
