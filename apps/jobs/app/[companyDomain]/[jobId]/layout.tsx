import { createServerClient } from "@/lib/supabase/server";
import { getJobPostById } from "@optima/supabase/queries";
import type {
	Department,
	JobPost,
	JobPostCampaign,
} from "@optima/supabase/types";
import { Badge } from "@optima/ui/components/badge";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@optima/ui/components/hover-card";
import {
	CheckmarkBadge01Icon,
	Clock05Icon,
	GridViewIcon,
	Location05Icon,
	MoneyExchange02Icon,
	TaskDaily01Icon,
} from "hugeicons-react";
import moment from "moment";
import { IoStatsChart } from "react-icons/io5";

export default async function JobPostLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ jobId: string }>;
}) {
	const { jobId } = await params;
	const supabase = await createServerClient();
	const { data, error } = await getJobPostById(supabase, jobId);
	const job = data as unknown as JobPost & {
		department: Department;
		campaigns: JobPostCampaign[];
	};

	return (
		<div className="flex flex-col  max-w-3xl mx-auto w-full gap-8 pt-12 relative p-4">
			<section className="flex flex-col gap-3  h-fit">
				<h2 className="text-xl font-bold mb-6">{job?.title}</h2>
				<div className="grid grid-cols-1 md:grid-cols-2  gap-4">
					<HoverCard openDelay={0} closeDelay={0}>
						<HoverCardTrigger className="flex items-center gap-2 w-fit capitalize">
							{/* <div className="flex items-start gap-2"> */}
							<GridViewIcon className="size-4" strokeWidth={2} />
							<p>{job.department.name}</p>
							{/* </div> */}
						</HoverCardTrigger>
						<HoverCardContent className="text-sm" side="right">
							<p>Associated Department</p>
						</HoverCardContent>
					</HoverCard>
					<HoverCard openDelay={0} closeDelay={0}>
						<HoverCardTrigger className="flex items-center gap-2 w-fit capitalize">
							<Location05Icon className="size-4" strokeWidth={2} />
							<p>{job.work_mode.replace("_", " ")}</p>
						</HoverCardTrigger>
						<HoverCardContent className="text-sm" side="right">
							<p>Work Mode</p>
						</HoverCardContent>
					</HoverCard>
					<HoverCard openDelay={0} closeDelay={0}>
						<HoverCardTrigger className="flex items-center gap-2 w-fit capitalize">
							<Clock05Icon className="size-4" strokeWidth={2} />
							<p>{job.employment_type.replace("_", " ")}</p>
						</HoverCardTrigger>
						<HoverCardContent className="text-sm" side="right">
							<p>Employment Type</p>
						</HoverCardContent>
					</HoverCard>
					<HoverCard openDelay={0} closeDelay={0}>
						<HoverCardTrigger className="flex items-center gap-2 w-fit capitalize">
							<MoneyExchange02Icon className="size-4" strokeWidth={2} />
							<p>{job.salary_range}</p>
						</HoverCardTrigger>
						<HoverCardContent className="text-sm" side="right">
							<p>Salary Range</p>
						</HoverCardContent>
					</HoverCard>
					<HoverCard openDelay={0} closeDelay={0}>
						<HoverCardTrigger className="flex items-start gap-2 w-fit capitalize">
							<IoStatsChart className="size-4" />
							<p>{job.experience_level.replace("_", " ")}</p>
						</HoverCardTrigger>
						<HoverCardContent className="text-sm" side="right">
							<p>Experience Level</p>
						</HoverCardContent>
					</HoverCard>
					<HoverCard openDelay={0} closeDelay={0}>
						<HoverCardTrigger className="flex items-start gap-2 capitalize">
							<TaskDaily01Icon className="size-5 min-w-fit" strokeWidth={2} />
							<div className="flex items-start gap-2 flex-wrap">
								{job.required_skills?.map((skill) => (
									<Badge key={skill} variant="secondary" size="sm">
										{skill}
									</Badge>
								))}
							</div>
						</HoverCardTrigger>
						<HoverCardContent className="text-sm" side="bottom">
							<p>Required Skills</p>
						</HoverCardContent>
					</HoverCard>
					<HoverCard openDelay={0} closeDelay={0}>
						<HoverCardTrigger className="flex items-start gap-2 capitalize md:col-span-2">
							<CheckmarkBadge01Icon
								className="size-5 min-w-fit"
								strokeWidth={2}
							/>
							<div className="flex items-start gap-2 flex-wrap">
								{job.benefits?.map((benefit) => (
									<Badge key={benefit} variant="secondary" size="sm">
										{benefit}
									</Badge>
								))}
							</div>
						</HoverCardTrigger>
						<HoverCardContent className="text-sm" side="bottom">
							<p>Benifits</p>
						</HoverCardContent>
					</HoverCard>
				</div>
				<div className="flex items-center gap-2">
					<p>
						Deadline:{" "}
						{job.campaigns?.find((camp) => camp.status === "running")?.end_date
							? moment(
									job.campaigns.find((camp) => camp.status === "running")
										?.end_date,
								).format("MM/DD/YYYY , HH:mm:A")
							: "No deadline set"}
					</p>
				</div>
			</section>
			{children}
		</div>
	);
}
