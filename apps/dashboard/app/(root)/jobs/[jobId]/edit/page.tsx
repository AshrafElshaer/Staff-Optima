import { JobPostForm } from "@/features/job-post/views/form/job-post-form";
import { createServerClient } from "@/lib/supabase/server";
import { getJobPostById } from "@optima/supabase/queries";
import type { JobPost } from "@optima/supabase/types";
import { Suspense } from "react";

export default async function EditJobPage({
	params,
}: {
	params: Promise<{ jobId: string }>;
}) {
	const { jobId } = await params;
	const supabase = await createServerClient();
	const { data: job, error } = await getJobPostById(supabase, jobId);

	return (
		<div className="flex flex-col items-start flex-1 gap-4">
			<Suspense fallback={<div>Loading...</div>}>
				<JobPostForm job={job as JobPost | null} />
			</Suspense>
		</div>
	);
}
