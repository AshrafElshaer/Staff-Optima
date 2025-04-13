import { UserOnboarding } from "@/features/onboarding/views/user-onboarding";
import { createServerClient } from "@/lib/supabase/server";
import { getCountryCode } from "@optima/location";
import { getCurrentUser } from "@optima/supabase/queries";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Onboarding User",
	description: "Setup your profile",
};

export default async function OnboardingUserPage() {
	const countryCode = await getCountryCode();

	const supabase = await createServerClient();
	const { data: user } = await getCurrentUser(supabase);

	if (user) {
		redirect("/onboarding/organization");
	}

	return <UserOnboarding countryCode={countryCode} />;
}
