import { OrganizationProfileForm } from "@/features/organization/profile/profile-form";
import { auth } from "@/lib/auth/auth";
import { getUserOrganization } from "@optima/database/queries";
import { headers } from "next/headers";
export default async function OrganizationProfilePage() {
	const headersList = await headers();
	const userId = headersList.get("x-user-id");
	const organization = await getUserOrganization(userId ?? "");
	return <OrganizationProfileForm organization={organization} />;
}
