"use client"

import { JobPostForm } from "@/features/job-post/views/job-post-form";

export default function CreateJobPage() {
	return (
		<div className="flex flex-col items-start flex-1 gap-4">
			<JobPostForm />
		</div>
	);
}
