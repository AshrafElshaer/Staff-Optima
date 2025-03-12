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

export function OrganizationBreadcrumb() {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);
	const isMobile = useIsMobile();

	if (!pathname.startsWith("/organization")) return null;

	const templateId = segments[1] === "email-templates" ? segments[2] : null;
	const memberId = segments[1] === "team" ? segments[2] : null;
	const departmentId = segments[1] === "departments" ? segments[2] : null;

	const getSegmentLabel = (segment: string, index: number) => {
		if (templateId && index === 2) {
			if (segment === "create") {
				return "New Template";
			}
			return "applied";
		}

		if (memberId && index === 2) {
			return "Ashraf Elshaer";
		}

		if (departmentId && index === 2) {
			return "Engineering";
		}

		const labels: Record<string, string> = {
			organization: "Organization",
			workflows: "Workflows",
			settings: "Settings",
			team: "Members",
			billing: "Billing & Usage",
			integrations: "Integrations",
			"email-templates": "Email Templates",
			create: "New Template",
			departments: "Departments",
		};
		return labels[segment] || segment;
	};

	return (
		<Breadcrumb>
			<BreadcrumbList className="overflow-x-auto scrollbar-hide w-full">
				{segments.map((segment, index) => {
					const isLastSegment = index === segments.length - 1;
					const isFirstSegment = index === 0;

					if (isMobile && !isFirstSegment && !isLastSegment) {
						if (index === 1) {
							return (
								<React.Fragment key={segment}>
									<BreadcrumbItem>
										<DropdownMenu>
											<DropdownMenuTrigger className="flex items-center gap-1">
												<BreadcrumbEllipsis className="h-4 w-4" />
												<span className="sr-only">Toggle menu</span>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="start">
												{segments.slice(1, -1).map((middleSegment, idx) => (
													<DropdownMenuItem key={idx.toString()}>
														<BreadcrumbLink asChild>
															<Link
																href={`/${segments.slice(0, idx + 2).join("/")}`}
															>
																{getSegmentLabel(middleSegment, idx)}
															</Link>
														</BreadcrumbLink>
													</DropdownMenuItem>
												))}
											</DropdownMenuContent>
										</DropdownMenu>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
								</React.Fragment>
							);
						}
						return null;
					}

					return (
						<React.Fragment key={segment}>
							<BreadcrumbItem className="capitalize">
								{isLastSegment ? (
									<BreadcrumbPage className="font-medium">
										{getSegmentLabel(segment, index)}
									</BreadcrumbPage>
								) : (
									<BreadcrumbLink asChild>
										<Link href={`/${segments.slice(0, index + 1).join("/")}`}>
											{getSegmentLabel(segment, index)}
										</Link>
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
							{!isLastSegment && <BreadcrumbSeparator />}
						</React.Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
