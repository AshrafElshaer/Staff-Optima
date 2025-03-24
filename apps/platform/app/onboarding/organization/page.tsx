import { OrganizationOnboarding } from "@/features/onboarding/views/organization-onboarding";
import { createServerClient } from "@/lib/supabase/server";
import { getOrganizationById } from "@optima/supabase/queries";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Onboarding Organization",
	description: "Setup your organization",
};

export default async function OnboardingOrganizationPage() {
	const supabase = await createServerClient();
	const headersList = await headers();
	const organization_id = headersList.get("x-organization-id");
	const { data: organization } = await getOrganizationById(
		supabase,
		organization_id ?? "",
	);

	if (organization) {
		redirect("/onboarding/congrats");
	}

	return <OrganizationOnboarding />;
}
