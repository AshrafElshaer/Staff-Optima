import { JobNavigation } from "@/components/job-navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getJobPostById } from "@optima/supabase/queries";
import { buttonVariants } from "@optima/ui/components/button";
import { headers } from "next/headers";
import Link from "next/link";
import Editor from "@optima/editor";
export default async function JobPostPage({
	params,
}: {
	params: Promise<{ jobId: string }>;
}) {
	const { jobId } = await params;
	const headersList = await headers();
	const pathname = headersList.get("x-pathname");
	const supabase = await createServerClient();
	const { data: job, error } = await getJobPostById(supabase, jobId);
	return (
		<div className="flex flex-col gap-4  ">
			<JobNavigation />
			<Editor content={job?.job_details ?? ""} isEditable={false} />
			<Link
				href={`${pathname}/application`}
				className={buttonVariants({ variant: "default" })}
			>
				Apply for this job
			</Link>
		</div>
	);
}
