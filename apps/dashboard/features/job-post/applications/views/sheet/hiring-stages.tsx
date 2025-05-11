import { useSupabase } from "@/hooks/use-supabase";

import { getApplicationStages } from "@optima/supabase/queries";
// import type { CandidateWithApplication } from "@optima/supabase/types";
import { Button } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";

import { queryClient } from "@/lib/react-query";
import type { Application } from "@optima/supabase/types";
import { Skeleton } from "@optima/ui/components/skeleton";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
// import { nextStageApplicationAction } from "../../candidates.actions";

export function HiringStages({ application }: { application: Application }) {
	const supabase = useSupabase();
	const { data: applicationStages, isLoading } = useQuery({
		queryKey: ["application-stages"],
		queryFn: async () => {
			const { data, error } = await getApplicationStages(
				supabase,
				application.company_id as string,
			);
			if (error) {
				throw error;
			}
			return data;
		},
	});
	// const { execute, isExecuting } = useAction(nextStageApplicationAction, {
	//   onSuccess: () => {
	//     queryClient.invalidateQueries({ queryKey: ["application-stages"] });
	//     toast.success("Stage updated successfully");
	//   },
	//   onError: ({ error }) => {
	//     toast.error(error.serverError);
	//   },
	// });

	const handleNextStage = () => {
		const currentStageOrder =
			applicationStages?.find((s) => s.id === application.stage_id)
				?.stage_order ?? 0;

		const nextStage = applicationStages?.find(
			(s) => s.stage_order === currentStageOrder + 1,
		);

		if (!nextStage) {
			toast.error("There is no next stage");
			return;
		}
		// execute({
		//   applicationId: candidate.applications[0]?.id as string,
		//   stageId: nextStage.id,
		// });
	};
	function handlePreviousStage() {
		const currentStageOrder =
			applicationStages?.find((s) => s.id === application.stage_id)
				?.stage_order ?? 0;
		const previousStage = applicationStages?.find(
			(s) => s.stage_order === currentStageOrder - 1,
		);
		if (!previousStage) {
			toast.error("There is no previous stage");
			return;
		}
		// execute({
		//   applicationId: candidate.applications[0]?.id as string,
		//   stageId: previousStage.id,
		// });
	}

	return (
		<Card className="bg-accent">
			<CardHeader className="flex-row items-center justify-between">
				<CardTitle>Hiring process</CardTitle>
				<div className="flex items-center gap-2">
					<Button
						variant="warning"
						size="xs"
						className="gap-1 items-center"
						onClick={handlePreviousStage}
						// disabled={isExecuting}
					>
						{/* {isExecuting ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              <ArrowLeft01Icon className="size-4" strokeWidth={2} />
            )} */}
						<ArrowLeft01Icon className="size-4" strokeWidth={2} />
						<span className="hidden sm:block">Previous Stage</span>
					</Button>
					<Button
						variant="success"
						size="xs"
						className="gap-1 items-center"
						onClick={handleNextStage}
						// disabled={isExecuting}
					>
						<span className="hidden sm:block">Next Stage</span>
						{/* {isExecuting ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              <ArrowRight01Icon className="size-4" strokeWidth={2} />
            )} */}
						<ArrowRight01Icon className="size-4" strokeWidth={2} />
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-4 flex-wrap">
					{isLoading ? (
						<>
							<div className="space-y-2 w-24">
								<Skeleton className="h-3 w-full" />
								<Skeleton className="h-2 w-full rounded-full" />
							</div>
							<div className="space-y-2 w-24">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-2 w-full rounded-full" />
							</div>
							<div className="space-y-2 w-24">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-2 w-full rounded-full" />
							</div>
						</>
					) : (
						applicationStages?.map((stage) => {
							const isCurrentStage = stage.id === application.stage_id;
							const isPreviousStage =
								stage.stage_order <
								(applicationStages.find((s) => s.id === application.stage_id)
									?.stage_order ?? 0);

							return (
								<div className="space-y-2" key={stage.id}>
									<p className="text-sm font-medium text-secondary-foreground">
										{stage.title}
									</p>
									<div
										className={`h-2 w-full rounded-full ${
											isCurrentStage
												? "bg-success"
												: isPreviousStage
													? "bg-success"
													: "bg-background"
										}`}
									/>
								</div>
							);
						})
					)}
				</div>
			</CardContent>
		</Card>
	);
}
