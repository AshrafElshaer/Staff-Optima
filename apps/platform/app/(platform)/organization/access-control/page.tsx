import { headers } from "next/headers";
import { getOrganizationRoles } from "@optima/database/queries";

export default async function AccessControlPage() {
	const headersList = await headers();
	const userId = headersList.get("x-user-id");
	const roles = await getOrganizationRoles(userId ?? "");
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Access Control</h1>
			<div className="flex flex-col gap-2">
				<pre>{JSON.stringify(roles, null, 2)}</pre>
			</div>
		</div>
	);
}
