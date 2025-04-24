import { PermissionGuard } from "@/features/auth/views/permission-gaurd";
import { CampaignsList } from "@/features/job-post/campaigns/views/campaings-list";
import { LaunchCampaign } from "@/features/job-post/campaigns/views/launch-campaign";
import { createServerClient } from "@/lib/supabase/server";
import { getJobCampaignsByJobId } from "@optima/supabase/queries";

export default async function JobCampaignsPage({
	params,
}: {
	params: Promise<{ jobId: string }>;
}) {
	const { jobId } = await params;
	const supabase = await createServerClient();
	const { data: campaigns, error } = await getJobCampaignsByJobId(
		supabase,
		jobId,
	);

	return (
		<div className="flex flex-col items-start flex-1 gap-4">
			<PermissionGuard requiredPermissions={["job:publish"]}>
				<LaunchCampaign jobPostId={jobId} />
			</PermissionGuard>
			<CampaignsList campaigns={campaigns ?? []} />
		</div>
	);
}
