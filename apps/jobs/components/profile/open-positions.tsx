import { filterSearchParamsCache } from "@/lib/filters.search-params";
import { createServerClient } from "@/lib/supabase/server";
import { getJobPosts } from "@optima/supabase/queries";
import {
	jobPostCampaignStatusEnum,
	type Department,
	type JobPost,
} from "@optima/supabase/types";
import { Badge } from "@optima/ui/components/badge";
import { JobCard } from "./job-card";
import { PositionsFilters } from "./positions-filters";

export async function OpenPositions({
	companyId,
}: {
	companyId: string;
}) {
	const supabase = await createServerClient();
	const filters = filterSearchParamsCache.all();
	const { data: jobPosts, error } = await getJobPosts(supabase, companyId, {
		...filters,
		campaign_status: [jobPostCampaignStatusEnum.running],
	});

	const groupedJobPosts = jobPosts?.reduce<
		Record<string, (JobPost & { department: Department })[]>
	>((acc, jobPost) => {
		const departmentId = jobPost.department_id;
		if (!departmentId) return acc;

		acc[departmentId] = acc[departmentId] || [];
		acc[departmentId].push(
			jobPost as unknown as JobPost & { department: Department },
		);
		return acc;
	}, {});

	return (
		<section className="p-4 max-w-3xl mx-auto w-full space-y-8">
			<div className="flex items-center gap-2">
				<h2 className="text-2xl font-bold text-left">Open Positions</h2>
				<Badge variant="info" size="md">
					{jobPosts?.length}
				</Badge>
			</div>
			<PositionsFilters companyId={companyId} />
			<div className="grid grid-cols-1  gap-4">
				{jobPosts && jobPosts.length > 0 && groupedJobPosts ? (
					Object.entries(groupedJobPosts).map(([departmentId, posts]) => (
						<div key={departmentId} className="space-y-4">
							<h3 className="text-xl font-semibold mb-4">
								{posts[0]?.department.name} Department
							</h3>
							{posts.map((jobPost) => (
								<JobCard
									key={jobPost.id}
									jobPost={
										jobPost as unknown as JobPost & { department: Department }
									}
								/>
							))}
						</div>
					))
				) : (
					<div className="flex items-center justify-center h-60 border rounded-md ">
						<p className="text-sm">No jobs are currently open</p>
					</div>
				)}
			</div>
		</section>
	);
}
