"use client";
import type { JobPostCampaign } from "@optima/supabase/types";
import { Progress } from "@optima/ui/components/progress";
import moment from "moment";
export function CampaignStatus({
	campaign,
}: { campaign: JobPostCampaign | undefined }) {
	if (!campaign)
		return (
			<>
				<p className="text-sm ">
					<span className="text-secondary-foreground">Not launched yet</span>
				</p>
				<Progress value={100} indicatorBg="bg-destructive" />
			</>
		);
	const status = campaign?.status;

	if (status === "scheduled") {
		return (
			<>
				<p className="text-sm ">
					<span className="text-secondary-foreground">Launching</span>{" "}
					<span>{moment(campaign.start_date).fromNow()}</span>
				</p>
				<Progress value={100} indicatorBg="bg-warning" />
			</>
		);
	}
	if (status === "running") {
		const progress = campaign.end_date
			? Math.min(
					100,
					Math.max(
						0,
						((moment(campaign.end_date).diff(campaign.start_date, "minutes") -
							moment(campaign.end_date).diff(moment(), "minutes")) /
							moment(campaign.end_date).diff(campaign.start_date, "minutes")) *
							100,
					),
				)
			: 100; // Show 100% progress for ongoing campaigns with no end date
		return (
			<>
				<p className="text-sm ">
					<span className="text-secondary-foreground">Deadline:</span>{" "}
					<span>
						{campaign.end_date
							? moment(campaign.end_date).fromNow()
							: "Not set"}
					</span>
				</p>
				<Progress value={progress} indicatorBg="bg-blue-500" />
			</>
		);
	}
	if (status === "completed") {
		return (
			<>
				<p className="text-sm ">
					<span>Campaign completed</span>
				</p>
				<Progress value={100} indicatorBg="bg-success" />
			</>
		);
	}
	if (status === "paused") {
		return (
			<>
				<p className="text-sm ">Campaign paused</p>
				<Progress value={100} indicatorBg="bg-warning" />
			</>
		);
	}
}
