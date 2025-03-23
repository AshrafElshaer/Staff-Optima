import { OrganizationProfileForm } from "@/features/organization/profile/views/profile-form";
import { createServerClient } from "@/lib/supabase/server";

import { getOrganizationById } from "@optima/supabase/queries";
import { headers } from "next/headers";

export default async function OrganizationProfilePage() {
	const supabase = await createServerClient();
	const headersList = await headers();

	const organizationId = headersList.get("x-organization-id");

	const {data:organization} = await getOrganizationById(supabase, organizationId ?? "");
	return <OrganizationProfileForm organization={organization} />;
}
