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

export function AccountBreadcrumb() {
	const pathname = usePathname();
	if (!pathname.startsWith("/account")) return null;

	return (
		<h1 className="font-medium truncate w-full">
			Manage your account settings and preferences.
		</h1>
	);
}
