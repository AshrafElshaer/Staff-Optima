import { CompanyOnboarding } from "@/features/onboarding/views/company-onboarding";
import { createServerClient } from "@/lib/supabase/server";
import { getCompanyById } from "@optima/supabase/queries";
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
	const company_id = headersList.get("x-company-id");
	const { data: company } = await getCompanyById(supabase, company_id ?? "");

	if (company) {
		redirect("/onboarding/congrats");
	}

	return <CompanyOnboarding />;
}
