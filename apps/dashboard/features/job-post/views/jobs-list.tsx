"use client";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import type { Department, JobPost } from "@optima/supabase/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import { Icons } from "@optima/ui/components/icons";
import { Progress } from "@optima/ui/components/progress";
import { Separator } from "@optima/ui/components/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@optima/ui/components/tooltip";
import { UserAdd01Icon } from "hugeicons-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
export interface JobPostWithDepartment extends JobPost {
	department: Department | null;
}

export function JobsList({ jobs }: { jobs: JobPostWithDepartment[] | null }) {
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
		<section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
			{jobs?.map((job) => (
				<Card
					key={job.id}
					className=" bg-accent border h-fit cursor-pointer"
					onClick={(e) => handleJobClick(e, job.id)}
				>
					<CardHeader>
						<CardTitle className="flex items-center">
							{job.title}
							{/* <JobCardDropdown job={job} /> */}
						</CardTitle>
						<CardDescription className=" capitalize flex items-center gap-2">
							<p className="mr-auto">{job.department?.name} </p>
							<p>
								{job.employment_type.split("_").join(" ")} -{" "}
								{job.work_mode.split("_").join(" ")}
							</p>
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
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
								<TooltipTrigger
									className="flex items-center gap-2 ml-auto"
									asChild
								>
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
			))}
		</section>
	);
}
