"use client";

import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@optima/ui/components/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@optima/ui/components/dropdown-menu";
import { useIsMobile } from "@optima/ui/hooks/use-mobile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function HomeBreadcrumb() {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);
	const isMobile = useIsMobile();

	if (pathname !== "/") return null;

	return (
		<Breadcrumb>
			<BreadcrumbList className="overflow-x-auto scrollbar-hide w-full">
				<BreadcrumbItem className="capitalize">
					<BreadcrumbPage className="font-medium">Dashboard</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
