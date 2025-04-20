"use client";
import { Icons } from "@optima/ui/components/icons";

import { TooltipTrigger } from "@optima/ui/components/tooltip";

import { TooltipContent } from "@optima/ui/components/tooltip";
import { Tooltip } from "@optima/ui/components/tooltip";

import { TooltipProvider } from "@optima/ui/components/tooltip";

import { useUserPreferences } from "@/hooks/use-user-preferences";
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
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
			console.log("clicked");
			return;
		}
		router.push(`/jobs/${jobId}`);
	};
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
				{/* <CampaignStatus campaign={onGoingCampaign} /> */}
				<p className="text-sm font-medium">Deadline in 3 days</p>
				<Progress value={50} indicatorBg="bg-success" />
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
						<TooltipTrigger className="flex items-center gap-2 ml-auto" asChild>
							<Link href={`/candidates?job=${job.id}`}>
								<Icons.UserAddFill width={16} height={16} />
								<p className=" font-medium font-mono">
									{/* {job.applications[0].count} */}
									{0}
								</p>
							</Link>
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
