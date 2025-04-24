import { PermissionGuard } from "@/features/auth/views/permission-gaurd";
import { loadJobPostsSearchParams } from "@/features/job-post/job-posts.search-params";
import { JobPostHeader } from "@/features/job-post/views/list/job-posts-header";
import {
	type JobPostWithDepartment,
	JobsList,
} from "@/features/job-post/views/list/jobs-list";
import { createServerClient } from "@/lib/supabase/server";
import { getJobPosts } from "@optima/supabase/queries";
import { buttonVariants } from "@optima/ui/components/button";
import { headers } from "next/headers";
import Link from "next/link";
import type { SearchParams } from "nuqs";

export default async function JobsPage({
	searchParams,
}: {
	searchParams: Promise<SearchParams>;
}) {
	const filters = await loadJobPostsSearchParams(searchParams);
	const supabase = await createServerClient();
	const headersList = await headers();
	const companyId = headersList.get("x-company-id");
	const { data: jobs, error } = await getJobPosts(
		supabase,
		companyId ?? "",
		filters,
	);

	if (error) {
		throw new Error(error.message);
	}

	return (
		<div className="flex flex-col items-start flex-1 gap-4">
			<JobPostHeader />

			<JobsList jobs={jobs as JobPostWithDepartment[]} />
		</div>
	);
}
