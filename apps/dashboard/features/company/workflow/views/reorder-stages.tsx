import { ArrowUpDownIcon } from "hugeicons-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@optima/ui/components/dropdown-menu";

import { useReactFlow } from "@xyflow/react";
import { reorderApplicationStagesAction } from "../stages-pipeline.actions";

import { Button } from "@optima/ui/components/button";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export function ReorderStages({
	stage_order,
	id,
}: { stage_order: string; id: string }) {
	const { setNodes, setEdges, getNodes } = useReactFlow();

	const { executeAsync: reorderApplicationStages, isExecuting: isReordering } =
		useAction(reorderApplicationStagesAction, {
			onSuccess: ({ data }) => {
				if (!data) return;
				setNodes(
					data.map((stage, idx) => ({
						id: stage.id,
						type: "stageNode",
						deletable: false,
						position: { x: 0, y: idx * 250 },
						data: stage,
					})),
				);
				setEdges(
					data.map((stage, idx) => ({
						id: `e${stage.id}-${data[idx + 1]?.id}`,
						source: stage.id,
						target: data[idx + 1]?.id ?? "rejected",
					})),
				);
			},
		});

	function handleMoveUp() {
		const nodes = getNodes();
		const targetStageId = nodes.find(
			(node) => Number(node.data.stage_order) === Number(stage_order) - 1,
		)?.id;
		if (!targetStageId) return toast.error("No stage to move up to");

		toast.promise(
			reorderApplicationStages({
				sourceStageId: id,
				targetStageId: targetStageId,
			}),
			{
				loading: "Reordering stage...",
				success: "Stage reordered successfully",
				error: ({ error }) => error.serverError,
			},
		);
	}

	function handleMoveDown() {
		const nodes = getNodes();
		const targetStageId = nodes.find(
			(node) => Number(node.data.stage_order) === Number(stage_order) + 1,
		)?.id;
		if (!targetStageId) return toast.error("No stage to move down to");

		toast.promise(
			reorderApplicationStages({
				sourceStageId: id,
				targetStageId: targetStageId,
			}),
			{
				loading: "Reordering stage...",
				success: "Stage reordered successfully",
				error: ({ error }) => error.serverError,
			},
		);
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" size="icon" disabled={isReordering}>
					<ArrowUpDownIcon size={18} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={handleMoveUp} disabled={isReordering}>
					Move up
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleMoveDown} disabled={isReordering}>
					Move down
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
