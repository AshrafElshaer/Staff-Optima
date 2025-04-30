"use client";

import type { JobPostCampaign } from "@optima/supabase/types";
import moment from "moment";

export function Deadline({ campaign }: { campaign: JobPostCampaign[] }) {
	return (
		<div className="flex items-center gap-2">
			<p>
				Deadline:{" "}
				{campaign.find((camp) => camp.status === "running")?.end_date
					? moment(
							campaign.find((camp) => camp.status === "running")?.end_date,
						).format("MM/DD/YYYY , HH:mm:A")
					: "No deadline set"}
			</p>
		</div>
	);
}
