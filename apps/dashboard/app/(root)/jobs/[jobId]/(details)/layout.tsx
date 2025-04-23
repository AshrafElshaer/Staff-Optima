import { createServerClient } from "@/lib/supabase/server";
import { getJobPostById } from "@optima/supabase/queries";
import { buttonVariants } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import moment from "moment";
import Link from "next/link";
import { JobDetailsNavigation } from "./navigation";
import { cn } from "@optima/ui/lib/utils";

type Props = {
	children: React.ReactNode;
	params: Promise<{
		jobId: string;
	}>;
};

export default async function JobDetailsLayout({ children, params }: Props) {
	const { jobId } = await params;
	const supabase = await createServerClient();
	const { data: job } = await getJobPostById(supabase, jobId);

	return (
		<div className="flex flex-col gap-4 flex-1">
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<h1 className="text-2xl font-semibold tracking-tight">
						{job?.title}
					</h1>
					<p className="text-sm text-muted-foreground">
						Created on {moment(job?.created_at).format("MMM DD YYYY")}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Link
						href={`/jobs/${jobId}/edit`}
						className={buttonVariants({ variant: "outline" })}
					>
						Edit Job
					</Link>
				</div>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card className="bg-accent h-fit">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Status</CardTitle>
						<div
							className={cn(
								" font-bold capitalize",
								job?.status === "published" && "text-success",
								job?.status === "archived" && "text-destructive",
								job?.status === "draft" && "text-warning",
							)}
						>
							{job?.status}
						</div>
					</CardHeader>
				</Card>
				<Card className="bg-accent h-fit">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Applications</CardTitle>
						<div className="font-mono font-bold">24</div>
					</CardHeader>
				</Card>
				<Card className="bg-accent h-fit">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Campaigns</CardTitle>
						<div className="font-mono font-bold">{job?.campaigns?.length}</div>
					</CardHeader>
				</Card>
			</div>

			<JobDetailsNavigation />

			{children}
		</div>
	);
}
