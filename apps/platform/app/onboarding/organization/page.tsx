import { OrganizationOnboarding } from "@/features/onboarding/views/organization-onboarding";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Onboarding Organization",
	description: "Setup your organization",
};

export default function OnboardingOrganizationPage() {
	return <OrganizationOnboarding />;
}
