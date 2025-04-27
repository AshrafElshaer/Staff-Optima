import { createServerClient } from "@/lib/supabase/server";
import { getJobPosts } from "@optima/supabase/queries";
import {
	jobPostCampaignStatusEnum,
	jobPostStatusEnum,
} from "@optima/supabase/types";
import { Card } from "@optima/ui/components/card";
import { Icons } from "@optima/ui/components/icons";
import { Skeleton } from "@optima/ui/components/skeleton";
import { headers } from "next/headers";

export async function OpenJobsWidget() {
	const headersList = await headers();
	const companyId = headersList.get("x-company-id");
	const supabase = await createServerClient();
	const { data: jobPosts } = await getJobPosts(supabase, companyId as string, {
		campaign_status: [jobPostCampaignStatusEnum.running],
	});

	return (
		<Card className="flex-row items-center  p-4 gap-2 bg-accent">
			<Icons.JobLinkFill width={20} height={20} />
			<span className="font-semibold">Open Jobs</span>
			<span className="text-lg font-semibold font-mono ml-auto">
				{jobPosts?.length}
			</span>
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
