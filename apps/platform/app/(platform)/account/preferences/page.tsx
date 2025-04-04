import { UserPreferences } from "@/features/user/setting/preferences";
import { createServerClient } from "@/lib/supabase/server";
import {
	//   getUserAvailability,
	getUserPreferences,
} from "@optima/supabase/queries";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
	title: "Preferences",
	description: "Manage your preferences.",
};

export default async function AccountSettingsPreferencesPage() {
	const supabase = await createServerClient();

	const { data: userPreferences } = await getUserPreferences(supabase);

	return <UserPreferences preferences={userPreferences} />;
}
