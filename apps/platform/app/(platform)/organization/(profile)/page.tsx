import { OrganizationProfileForm } from "@/features/organization/profile/profile-form";
import { getUserOrganization } from "@optima/database/queries";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
export default async function OrganizationProfilePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const organization = await getUserOrganization(session?.user.id ?? "");
	return <OrganizationProfileForm organization={organization} />;
}
