import { PermissionGuard } from "@/features/auth/views/permission-gaurd";
import { ArchiveJob } from "@/features/job-post/views/archive-job";
import { UnarchiveJob } from "@/features/job-post/views/unarchive-job";
import { createServerClient } from "@/lib/supabase/server";
import { getJobPostById } from "@optima/supabase/queries";
import { buttonVariants } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import { Icons } from "@optima/ui/components/icons";
import { cn } from "@optima/ui/lib/utils";
import { CheckCircle } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { IoDocuments } from "react-icons/io5";
import { MdSignalWifiStatusbarConnectedNoInternet1 } from "react-icons/md";
import { JobDetailsNavigation } from "./navigation";

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
			<div className="flex items-start sm:items-center justify-between">
				<div className="space-y-1">
					<h1 className="text-2xl font-semibold tracking-tight">
						{job?.title}
					</h1>
					<p className="text-sm text-muted-foreground">
						Created on {moment(job?.created_at).format("MMM DD YYYY")}
					</p>
				</div>
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
					<PermissionGuard requiredPermissions={["job:update"]}>
						<Link
							href={`/jobs/${jobId}/edit`}
							className={buttonVariants({ variant: "outline" })}
						>
							Edit Job
						</Link>
					</PermissionGuard>
					{job?.status === "archived" ? (
						<PermissionGuard requiredPermissions={["job:status"]}>
							<UnarchiveJob jobId={jobId} />
						</PermissionGuard>
					) : (
						<PermissionGuard requiredPermissions={["job:status"]}>
							<ArchiveJob jobId={jobId} jobTitle={job?.title ?? ""} />
						</PermissionGuard>
					)}
				</div>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card className="bg-accent h-fit">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle className="flex flex-row items-center gap-2">
							<MdSignalWifiStatusbarConnectedNoInternet1 className="size-4" />
							Status
						</CardTitle>
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
						<CardTitle className="flex flex-row items-center gap-2">
							<IoDocuments className="size-4" />
							Applications
						</CardTitle>
						<div className="font-mono font-bold">
							{job?.applications?.length ?? 0}
						</div>
					</CardHeader>
				</Card>

				<Card className="bg-accent h-fit">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle className="flex flex-row items-center gap-2">
							<CheckCircle className="size-4" />
							Hired
						</CardTitle>
						<div className="font-mono font-bold">
							{job?.applications?.filter(
								(application) => application.status === "hired",
							).length ?? 0}
						</div>
					</CardHeader>
				</Card>
				<Card className="bg-accent h-fit">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle className="flex flex-row items-center gap-2">
							<Icons.MegaphoneFill className="size-4" />
							Campaigns
						</CardTitle>
						<div className="font-mono font-bold">{job?.campaigns?.length}</div>
					</CardHeader>
				</Card>
			</div>

			<JobDetailsNavigation />

			{children}
		</div>
	);
}
