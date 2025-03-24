import { OrganizationProfileForm } from "@/features/organization/profile/views/profile-form";
import { createServerClient } from "@/lib/supabase/server";

import { getOrganizationById } from "@optima/supabase/queries";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Profile",
	description: "Manage Organization Public Profile",
};

export default async function OrganizationProfilePage() {
	const supabase = await createServerClient();
	const headersList = await headers();

	const organizationId = headersList.get("x-organization-id");

	const { data: organization } = await getOrganizationById(
		supabase,
		organizationId ?? "",
	);

	if (!organization) {
		notFound();
	}
	return <OrganizationProfileForm organization={organization} />;
}
