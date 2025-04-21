import { JobCardLoading } from "@/features/job-post/views/list/job-card";
import { Button } from "@optima/ui/components/button";

export default function JobsLoading() {
	return (
		<div className="flex flex-col items-start flex-1 gap-4">
			<Button className="ml-auto" variant="secondary" disabled>
				Create Job
			</Button>
			<section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
				<JobCardLoading />
				<JobCardLoading />
				<JobCardLoading />
			</section>
		</div>
	);
}
