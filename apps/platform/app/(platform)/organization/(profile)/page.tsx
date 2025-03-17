import { OrganizationProfileForm } from "@/features/organization/profile/profile-form";
import { auth } from "@/lib/auth/auth";
import { getUserOrganization } from "@optima/database/queries";
import { headers } from "next/headers";

export default async function OrganizationProfilePage() {
	// const headersList = await headers();
	// const userId = headersList.get("x-user-id");

	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const organization = await getUserOrganization(session?.user.id ?? "");
	return <OrganizationProfileForm organization={organization} />;
}
