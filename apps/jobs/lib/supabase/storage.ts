import type { SupabaseInstance } from "@optima/supabase/types";
type UploadFileProps = {
	supabase: SupabaseInstance;
	bucket: string;
	path: string;
	file: File;
};
export async function uploadFile({
	supabase,
	bucket,
	path,
	file,
}: UploadFileProps) {
	const { data, error } = await supabase.storage
		.from(bucket)
		.upload(path, file, {
			contentType: file.type,
			upsert: true,
		});

	if (error) {
		throw error;
	}

	const {
		data: { publicUrl },
	} = supabase.storage.from(bucket).getPublicUrl(data.path);

	return { publicUrl, ...data };
}

type UploadOrganizationLogoProps = {
	supabase: SupabaseInstance;
	companyId: string;
	file: File;
};
export async function uploadOrganizationLogo({
	supabase,
	companyId,
	file,
}: UploadOrganizationLogoProps) {
	return uploadFile({
		supabase,
		bucket: "company_logos",
		path: companyId,
		file,
	});
}

type UploadUserAvatarProps = {
	supabase: SupabaseInstance;
	userId: string;
	file: File;
};
export async function uploadUserAvatar({
	supabase,
	userId,
	file,
}: UploadUserAvatarProps) {
	return uploadFile({ supabase, bucket: "avatars", path: userId, file });
}
