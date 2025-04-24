"use client";
import type { JobPost } from "@optima/supabase/types";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@optima/ui/components/alert-dialog";
import { Button } from "@optima/ui/components/button";
import { Icons } from "@optima/ui/components/icons";
import { Input } from "@optima/ui/components/inputs";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { archiveJobPostAction } from "../job-post.actions";

interface ArchiveJobProps {
	jobId: string;
	jobTitle: string;
}

export function ArchiveJob({ jobId, jobTitle }: ArchiveJobProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [confirmJobTitle, setConfirmJobTitle] = useState("");
	const { execute: archiveJob, isExecuting } = useAction(archiveJobPostAction, {
		onSuccess: () => {
			toast.success("Job archived successfully");
			setIsOpen(false);
			setConfirmJobTitle("");
		},
		onError: ({ error }) =>
			toast.error(error.serverError ?? "Failed to archive job"),
	});

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" size="sm" className="w-full sm:w-fit">
					Archive
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
				</AlertDialogHeader>
				<p className="text-sm">
					Please type{" "}
					<span className="font-medium p-0.5 bg-accent">{jobTitle}</span> to
					confirm archive
				</p>
				<Input
					value={confirmJobTitle}
					onChange={(e) => setConfirmJobTitle(e.target.value)}
				/>
				<AlertDialogFooter className="flex-row *:flex-1">
					<Button
						variant="outline"
						onClick={() => setIsOpen(false)}
						disabled={isExecuting}
						className="flex-1"
					>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={() => archiveJob({ id: jobId })}
						disabled={confirmJobTitle !== jobTitle || isExecuting}
						className="flex-1"
					>
						{isExecuting ? (
							<Icons.Loader className="w-4 h-4 animate-spin" />
						) : null}
						Yes, archive job
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
