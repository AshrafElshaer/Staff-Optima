import { ContactInfoLoading } from "@/features/user/setting/account/views/contact-info";
import { FullNameLoading } from "@/features/user/setting/account/views/full-name";
import { ProfilePicLoading } from "@/features/user/setting/account/views/profile-pic";

export default function AccountSettingsLoading() {
	return (
		<section className="space-y-8 flex-1 max-w-3xl">
			<ProfilePicLoading />
			<FullNameLoading />
			<ContactInfoLoading />
		</section>
	);
}
