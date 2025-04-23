import type {
	Department,
	JobPost,
	JobPostCampaign,
} from "@optima/supabase/types";

import { JobCard } from "./job-card";
export interface JobPostWithDepartment extends JobPost {
	department: Department | null;
	campaigns: JobPostCampaign[] | null;
}

export function JobsList({ jobs }: { jobs: JobPostWithDepartment[] | null }) {
	return (
		<section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
			{jobs?.map((job) => (
				<JobCard key={job.id} job={job} />
			))}
		</section>
	);
}
