import { JobPostFormLoading } from "@/features/job-post/views/form/job-form-loading";
import { JobPostForm } from "@/features/job-post/views/form/job-post-form";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export default function CreateJobPage() {
	return (
		<div className="flex flex-col items-start flex-1 gap-4">
			<Suspense fallback={<JobPostFormLoading />}>
				<JobPostForm job={null} />
			</Suspense>
		</div>
	);
}
