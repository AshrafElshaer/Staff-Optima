import { CompanyProfileForm } from "@/features/company/profile/views/profile-form";
import { createServerClient } from "@/lib/supabase/server";

import { getCompanyById } from "@optima/supabase/queries";
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

	const companyId = headersList.get("x-company-id");

	const { data: company } = await getCompanyById(supabase, companyId ?? "");

	if (!company) {
		notFound();
	}
	return <CompanyProfileForm company={company} />;
}
