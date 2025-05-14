"use client";
import { Icons } from "@optima/ui/components/icons";

import { TooltipTrigger } from "@optima/ui/components/tooltip";

import { TooltipContent } from "@optima/ui/components/tooltip";
import { Tooltip } from "@optima/ui/components/tooltip";

import { TooltipProvider } from "@optima/ui/components/tooltip";

import { useUserPreferences } from "@/hooks/use-user-preferences";
import { jobPostCampaignStatusEnum } from "@optima/supabase/types";
import { Badge } from "@optima/ui/components/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import { Progress } from "@optima/ui/components/progress";
import { Separator } from "@optima/ui/components/separator";
import { Skeleton } from "@optima/ui/components/skeleton";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CampaignStatus } from "./campiagn-status";
import type { JobPostWithDepartment } from "./jobs-list";
export function JobCard({ job }: { job: JobPostWithDepartment }) {
	const { data: userPreferences } = useUserPreferences();
	const router = useRouter();

	const handleJobClick = (
		e: React.MouseEvent<HTMLDivElement>,
		jobId: string,
	) => {
		const target = e.target as HTMLElement;
		if (target.tagName === "A" || target.closest("a")) {
			return;
		}
		router.push(`/jobs/${jobId}`);
	};

	const onGoingCampaign =
		job.campaigns?.find(
			(campaign) =>
				campaign.status === jobPostCampaignStatusEnum.running ||
				campaign.status === jobPostCampaignStatusEnum.scheduled,
		) ||
		// if no on going campaign, return the laat campaign
		job.campaigns?.sort(
			(a, b) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
		)[0];
	return (
		<Card
			className=" bg-accent border h-fit cursor-pointer"
			onClick={(e) => handleJobClick(e, job.id)}
		>
			<CardHeader>
				<CardTitle className="flex items-center">
					{job.title}
					{/* <JobCardDropdown job={job} /> */}
					<Badge
						variant={
							job.status === "draft"
								? "warning"
								: job.status === "archived"
									? "destructive"
									: "success"
						}
						size="sm"
						className="ml-auto capitalize"
					>
						{job.status}
					</Badge>
				</CardTitle>
				<CardDescription className=" capitalize flex items-center gap-2">
					<p className="mr-auto">{job.department?.name} </p>
					<p>
						{job.employment_type.split("_").join(" ")} -{" "}
						{job.work_mode.split("_").join(" ")}
					</p>
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-1">
				<CampaignStatus campaign={onGoingCampaign} />
			</CardContent>
			<Separator />
			<CardFooter className="flex items-center gap-2 text-sm">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger className="flex items-center gap-2">
							<Icons.CalendarFill width={16} height={16} />
							<p className=" font-medium font-mono">
								{moment(job.created_at).format(
									userPreferences?.date_format ?? "MM/DD/YYYY",
								)}
							</p>
						</TooltipTrigger>
						<TooltipContent>
							<p className=" font-medium">Created At</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger className="flex items-center gap-2 ml-auto">
							<Icons.UserAddFill width={16} height={16} />
							<p className=" font-medium font-mono">
								{job.applications?.length ?? 0}
							</p>
						</TooltipTrigger>
						<TooltipContent>
							<p className=" font-medium">Applications</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</CardFooter>
		</Card>
	);
}

export function JobCardLoading() {
	return (
		<Card className=" bg-accent border h-fit ">
			<CardHeader>
				<CardTitle className="flex items-center">
					<Skeleton className="w-20 h-4" />
					<Skeleton className="w-16 ml-auto h-6" />
				</CardTitle>
				<CardDescription className=" capitalize flex items-center gap-2">
					<Skeleton className="w-12 h-4 mr-auto" />

					<div className="flex items-center gap-1">
						<Skeleton className="w-12 h-4" />
						-
						<Skeleton className="w-12 h-4" />
					</div>
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-1">
				{/* <CampaignStatus campaign={onGoingCampaign} /> */}
				<Skeleton className="w-20 h-3" />
				<Skeleton className="w-full h-3 rounded-full" />
			</CardContent>
			<Separator />
			<CardFooter className="flex items-center justify-between gap-2 text-sm">
				<div className="flex items-center gap-2">
					<Icons.CalendarFill width={16} height={16} />
					<Skeleton className="w-4 h-4" />
				</div>
				<div className="flex items-center gap-2">
					<Icons.UserAddFill width={16} height={16} />
					<Skeleton className="w-4 h-4" />
				</div>
			</CardFooter>
		</Card>
	);
}
