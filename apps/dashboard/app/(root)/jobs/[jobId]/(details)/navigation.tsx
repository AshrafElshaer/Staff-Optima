"use client";
import { buttonVariants } from "@optima/ui/components/button";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

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
				Campaigns
			</Link>
		</div>
	);
}
