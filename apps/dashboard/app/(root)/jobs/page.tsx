import { PermissionGuard } from "@/components/permission-gaurd";
import {
	type JobPostWithDepartment,
	JobsList,
} from "@/features/job-post/views/list/jobs-list";
import { createServerClient } from "@/lib/supabase/server";
import { getJobPosts } from "@optima/supabase/queries";
import { buttonVariants } from "@optima/ui/components/button";
import { headers } from "next/headers";
import Link from "next/link";

export default async function JobsPage() {
	const supabase = await createServerClient();
	const headersList = await headers();
	const companyId = headersList.get("x-company-id");
	const { data: jobs, error } = await getJobPosts(supabase, companyId ?? "");

	if (error) {
		throw new Error(error.message);
	}

	return (
		<div className="flex flex-col items-start flex-1 gap-4">
			<PermissionGuard requiredPermissions={["job:create"]}>
				<Link
					href="/jobs/create"
					className={buttonVariants({
						variant: "secondary",
						className: "ml-auto",
					})}
				>
					Create Job
				</Link>
			</PermissionGuard>
			<JobsList jobs={jobs as JobPostWithDepartment[]} />
		</div>
	);
}
