import { JobNavigation } from "@/components/job-navigation";
import { ApplicationForm } from "@/features/application/views/application-form";
import { createServerClient } from "@/lib/supabase/server";
import { getJobPostById } from "@optima/supabase/queries";
import type { JobPost } from "@optima/supabase/types";

type ApplicationPageProps = {
	params: Promise<{
		domain: string;
		jobId: string;
	}>;
};

export default async function ApplicationPage({
	params,
}: ApplicationPageProps) {
	const { domain, jobId } = await params;
	const supabase = await createServerClient();
	const { data: job } = await getJobPostById(supabase, jobId);
	if (!job) {
		return <div>Job not found</div>;
	}
	return (
		<div className="flex flex-col flex-1 gap-4  w-full ">
			<ApplicationForm job={job as unknown as JobPost} />
		</div>
	);
}
