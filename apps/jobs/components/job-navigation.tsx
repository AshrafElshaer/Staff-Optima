"use client";
import { buttonVariants } from "@optima/ui/components/button";
import { FileEditIcon } from "hugeicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrOverview } from "react-icons/gr";
import { IoDocumentsOutline } from "react-icons/io5";

export function JobNavigation() {
	const pathname = usePathname();
	const overviewPath = pathname.split("/").slice(0, 3).join("/");
	const applicationsPath = `${pathname.split("/").slice(0, 3).join("/")}/application`;

	const isOverview = pathname === overviewPath;
	const isApplications = pathname === applicationsPath;

	return (
		<nav className="flex items-center gap-4">
			<Link
				href={overviewPath}
				className={buttonVariants({
					variant: isOverview ? "secondary" : "ghost",
				})}
			>
				<GrOverview className="size-4" />
				Overview
			</Link>
			<Link
				href={applicationsPath}
				className={buttonVariants({
					variant: isApplications ? "secondary" : "ghost",
				})}
			>
				<FileEditIcon className="size-4" strokeWidth={2} />
				Application
			</Link>
		</nav>
	);
}
