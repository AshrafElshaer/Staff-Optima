"use client";
import { buttonVariants } from "@optima/ui/components/button";
import { Icons } from "@optima/ui/components/icons";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { IoDocuments, IoDocumentsOutline } from "react-icons/io5";
export function JobDetailsNavigation() {
	const params = useParams();
	const pathname = usePathname();

	function isActive(path: string) {
		return pathname === path;
	}
	return (
		<div className="flex items-center gap-2">
			<Link
				href={`/jobs/${params.jobId}`}
				className={buttonVariants({
					variant: isActive(`/jobs/${params.jobId}`) ? "secondary" : "ghost",
				})}
			>
				{isActive(`/jobs/${params.jobId}`) ? (
					<IoDocuments />
				) : (
					<IoDocumentsOutline />
				)}
				Applications
			</Link>
			<Link
				href={`/jobs/${params.jobId}/campaigns`}
				className={buttonVariants({
					variant: isActive(`/jobs/${params.jobId}/campaigns`)
						? "secondary"
						: "ghost",
				})}
			>
				{isActive(`/jobs/${params.jobId}/campaigns`) ? (
					<Icons.MegaphoneFill />
				) : (
					<Icons.Megaphone />
				)}
				Campaigns
			</Link>
		</div>
	);
}
