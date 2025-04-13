import { ContactInfo } from "./contact-info";
import { FullName } from "./full-name";
import { ProfilePic } from "./profile-pic";
import { getCurrentUser } from "@optima/supabase/queries";
import { createServerClient } from "@/lib/supabase/server";

export async function AccountSettings() {
	const supabase = await createServerClient();
	const { data: user } = await getCurrentUser(supabase);
	if (!user) {
		return null;
	}
	return (
		<section className="space-y-8 flex-1 max-w-3xl">
			<ProfilePic user={user} />
			<FullName user={user} />
			<ContactInfo user={user} />
		</section>
	);
}
