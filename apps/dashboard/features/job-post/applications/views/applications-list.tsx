import { createServerClient } from "@/lib/supabase/server";
import {
	getApplicationStages,
	getApplicationsByJobId,
} from "@optima/supabase/queries";
import type {
	Application,
	Candidate,
	CandidateSocialLink,
} from "@optima/supabase/types";

import { Badge } from "@optima/ui/components/badge";

import { ScrollArea, ScrollBar } from "@optima/ui/components/scroll-area";
import { Separator } from "@optima/ui/components/separator";
import { headers } from "next/headers";

import { ApplicationCard } from "./application-card";
import { ApplicationSheet } from "./sheet/application-sheet";

interface ApplicationWithCandidate extends Application {
	candidate: Candidate & {
		social_links: CandidateSocialLink[];
	};
}

export async function ApplicationsList({ jobId }: { jobId: string }) {
	const headersList = await headers();
	const supabase = await createServerClient();
	const companyId = headersList.get("x-company-id");

	const [{ data: applications }, { data: applicationStages }] =
		await Promise.all([
			getApplicationsByJobId(supabase, jobId),
			getApplicationStages(supabase, companyId ?? ""),
		]);

	const applicationsByStage = applications?.reduce(
		(acc, application) => {
			const key = application.stage_id as string;
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(application);
			return acc;
		},
		{} as Record<string, ApplicationWithCandidate[]>,
	);

	return (
		<ScrollArea className="w-full whitespace-nowrap ">
			<section className="flex items-start gap-4  pb-4">
				{applicationStages?.map((stage) => (
					<div key={stage.id} className="w-86 border rounded-md ">
						<div className="flex items-center gap-4 px-2 py-2 bg-muted">
							<div
								className="h-5 w-1 rounded-sm"
								style={{
									backgroundColor: stage.indicator_color,
								}}
							/>
							<h2>{stage.title}</h2>
							<Badge variant="info" size="sm" className="ml-auto">
								{applicationsByStage?.[stage.id]?.length ?? 0}
							</Badge>
						</div>
						<Separator />
						<ScrollArea className="h-140  space-y-2">
							{applicationsByStage?.[stage.id]?.map((application) => (
								<ApplicationSheet
									key={application.id}
									application={application}
								/>
							))}
						</ScrollArea>
					</div>
				))}
			</section>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
