import { createBrowserClient } from "@optima/supabase/client";
import type { SupabaseInstance } from "@optima/supabase/types";
// @ts-ignore
import { createImageUpload } from "novel";
import { toast } from "sonner";

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

	return publicUrl;
}

const onUpload = async (file: File) => {
	const supabase = createBrowserClient();

	return new Promise((resolve, reject) => {
		return toast.promise(
			async () => {
				try {
					const url = await uploadFile({
						supabase,
						bucket: "editor-documents",
						path: `${Date.now()}-${file.name}`,
						file,
					});
					resolve(url);
				} catch (error) {
					reject(error);
				}
			},
			{
				loading: "Uploading...",
				success: "Uploaded",
				error: "Upload failed, please try again",
			},
		);
	});
};

export const uploadFn = createImageUpload({
	onUpload,
	validateFn: (file) => {
		if (!file.type.includes("image/")) {
			toast.error("File type not supported.");
			return false;
		}
		if (file.size / 1024 / 1024 > 20) {
			toast.error("File size too big (max 20MB).");
			return false;
		}
		return true;
	},
});
