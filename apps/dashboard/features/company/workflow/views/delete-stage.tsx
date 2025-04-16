"use client";
import type { ApplicationStage, Department } from "@optima/supabase/types";
import {
	AlertDialog,
	AlertDialogCancel,
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
import { Label } from "@optima/ui/components/label";
import { useReactFlow } from "@xyflow/react";
import { Delete01Icon, Delete03Icon } from "hugeicons-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { deleteApplicationStageAction } from "../stages-pipeline.actions";

export function DeleteStage({
	stage,
}: {
	stage: ApplicationStage;
}) {
	const [open, setOpen] = useState(false);
	const [confirmation, setConfirmation] = useState("");
	const { setNodes, setEdges } = useReactFlow();
	const { execute: deleteStage, isExecuting: isDeleting } = useAction(
		deleteApplicationStageAction,
		{
			onSuccess: ({ data }) => {
				toast.success("Stage deleted successfully");

				setNodes((nodes) =>
					nodes
						.filter((node) => node.id !== stage.id)
						.map((node, idx) => ({
							...node,
							position: { x: 0, y: idx * 250 },
						})),
				);
				if (data) {
					setEdges(
						data.map((stage, idx) => ({
							id: `e${stage.id}-${data[idx + 1]?.id}`,
							source: stage.id,
							target: data[idx + 1]?.id ?? "rejected",
						})),
					);
				}
				setOpen(false);
			},
			onError: ({ error }) => {
				toast.error(error.serverError);
			},
		},
	);
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" size="icon" disabled={isDeleting}>
					<Delete01Icon size={18} />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>
					This action cannot be undone. This will permanently delete this stage
					and remove your data from our servers.
				</AlertDialogDescription>

				<div className="space-y-4">
					<Label className="font-semibold">
						Please type <span className="bg-muted p-1">{stage.title} </span> to
						confirm
					</Label>
					<Input
						value={confirmation}
						onChange={(e) => setConfirmation(e.target.value)}
						placeholder="IT , Support etc"
					/>
				</div>
				<AlertDialogFooter className="flex-row">
					<AlertDialogCancel disabled={isDeleting} className="flex-1">
						Cancel
					</AlertDialogCancel>
					<Button
						className="flex-1"
						variant="destructive"
						disabled={confirmation !== stage.title || isDeleting}
						onClick={() => deleteStage({ id: stage.id })}
					>
						{isDeleting ? (
							<Icons.Loader className="animate-spin size-4" />
						) : null}
						Confirm
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
