"use client";

import { Button } from "@optima/ui/components/button";
import { Icons } from "@optima/ui/components/icons";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { updateJobPostAction } from "../job-post.actions";

export function UnarchiveJob({ jobId }: { jobId: string }) {
	const { execute: unarchiveJob, isExecuting } = useAction(
		updateJobPostAction,
		{
			onSuccess: () => toast.success("Job unarchived successfully"),
			onError: ({ error }) =>
				toast.error(error.serverError ?? "Failed to unarchive job"),
		},
	);
	return (
		<Button
			variant="success"
			size="sm"
			className="w-full sm:w-fit"
			onClick={() => unarchiveJob({ id: jobId, status: "draft" })}
			disabled={isExecuting}
		>
			{isExecuting ? <Icons.Loader className="w-4 h-4 animate-spin" /> : null}
			Unarchive
		</Button>
	);
}
