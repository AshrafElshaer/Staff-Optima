import { useSupabase } from "@/hooks/use-supabase";
import { formatBytes } from "@/lib/formatters/format-bytes";
import { getFileIcon } from "@/lib/get-file-icon";
import { getAttachmentsByApplicationId } from "@optima/supabase/queries";
import { buttonVariants } from "@optima/ui/components/button";
import { Skeleton } from "@optima/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export function AttachmentsList({ applicationId }: { applicationId: string }) {
	const supabase = useSupabase();
	const { data: attachments, isLoading } = useQuery({
		queryKey: ["attachments", applicationId],
		queryFn: async () => {
			const { data, error } = await getAttachmentsByApplicationId(
				supabase,
				applicationId,
			);
			if (error) {
				throw error;
			}
			return data;
		},
	});
	if (isLoading) {
		return (
			<div className="flex flex-col gap-2">
				<Skeleton className="w-full h-8" />
				<Skeleton className="w-full h-8" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			{attachments?.map((attachment) => {
				const [fileName, fileType] = attachment.file_name.split(".");

				return (
					<Link
						key={attachment.id}
						href={attachment.file_url}
						target="_blank"
						className={buttonVariants({
							variant: "secondary",
							className: "!justify-start h-12",
						})}
					>
						{getFileIcon(fileType ?? "")}
						<p className=" font-medium">{fileName}</p>
						<p className=" font-medium capitalize">
							( {attachment.attachment_type} )
						</p>
						<p className=" font-medium capitalize ml-auto text-muted-foreground">
							{formatBytes(attachment.file_size)}
						</p>
					</Link>
				);
			})}
		</div>
	);
}
