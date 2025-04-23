import { CampaignsListLoading } from "@/features/job-post/campaigns/views/campaings-list";
import { Button } from "@optima/ui/components/button";

export default function JobDetailsCampaignsLoading() {
	return (
		<div className="flex flex-col gap-4">
			<Button variant="secondary" className="w-full sm:w-fit ml-auto" disabled>
				Launch Campaign
			</Button>
			<CampaignsListLoading />
		</div>
	);
}
