import { JobPostForm } from "@/features/job-post/views/job-post-form";

import { Suspense } from "react";

export const dynamic = "force-dynamic";
export default function CreateJobPage() {
	return (
		<div className="flex flex-col items-start flex-1 gap-4">
			<Suspense fallback={<div>Loading...</div>}>
				<JobPostForm />
			</Suspense>
		</div>
	);
}
