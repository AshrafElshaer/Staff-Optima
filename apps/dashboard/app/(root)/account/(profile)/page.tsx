import { AccountSettings } from "@/features/user/setting/account/views";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Account Settings",
	description: "Manage your account settings.",
};

export default async function AccountSettingsPage() {
	return <AccountSettings />;
}
