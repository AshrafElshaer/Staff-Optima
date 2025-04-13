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

export function JobsBreadcrumb() {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);
	const isMobile = useIsMobile();

	const isCreatePage = segments[1] === "create";
	const jobId = !isCreatePage ? segments[1] : null;

	// const { data: jobDetails, isLoading } = useJob(jobId);
	const jobDetails = {
		title: "Frontend Engineer",
	};

	if (!pathname.startsWith("/jobs")) return null;

	// Add a mapping for segment labels
	const getSegmentLabel = (segment: string, index: number) => {
		// If it's the job ID segment and we're loading
		// if (index === 1 && jobId && isLoading) {
		// 	return "Loading...";
		// }

		// If it's the job ID segment and we have job details
		if (index === 1 && jobId && jobDetails) {
			return jobDetails.title;
		}

		const labels: Record<string, string> = {
			jobs: "Jobs",
			create: "Create Job",
			edit: "Edit Job",
			applications: "Applications",
			campaigns: "Campaigns",
		};
		return labels[segment] || segment;
	};

	return (
		<Breadcrumb>
			<BreadcrumbList className="overflow-x-auto scrollbar-hide w-full">
				{segments.map((segment, index) => {
					const isLastSegment = index === segments.length - 1;
					const isFirstSegment = index === 0;

					// On mobile, show ellipsis dropdown for middle segments
					if (isMobile && !isFirstSegment && !isLastSegment) {
						if (index === 1) {
							// Only show dropdown once for middle segments
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
																{getSegmentLabel(middleSegment, idx + 1)}
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
