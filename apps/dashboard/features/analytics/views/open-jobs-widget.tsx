import { createServerClient } from "@/lib/supabase/server";
// import { getJobPosts } from "@optima/supabase/queries";
// import { jobPostCampaignStatusEnum } from "@optima/supabase/types";
import { Card } from "@optima/ui/components/card";
import { Icons } from "@optima/ui/components/icons";
import { Skeleton } from "@optima/ui/components/skeleton";
import { headers } from "next/headers";

export async function OpenJobsWidget() {
	const headersList = await headers();
	// const organizationId = headersList.get("x-organization-id");
	// const supabase = await createServerClient({
	// 	isAdmin: true,
	// });
	// const { data: jobPosts } = await getJobPosts(
	//   supabase,
	//   organizationId as string,
	//   {
	//     status: [jobPostCampaignStatusEnum.active],
	//   },
	// );
	return (
		<Card className="flex-row items-center  p-4 gap-2 bg-accent">
			<Icons.JobLinkFill width={20} height={20} />
			<span className="font-semibold">Open Jobs</span>
			<span className="text-lg font-semibold font-mono ml-auto">0</span>
		</Card>
	);
}

export function OpenJobsWidgetSkeleton() {
	return (
		<Card className="flex-row items-center  p-4 gap-2 bg-accent">
			<Icons.JobLinkFill width={20} height={20} />
			<span className="font-semibold">Open Jobs</span>
			<Skeleton className="size-7 ml-auto rounded-sm" />
		</Card>
	);
}
