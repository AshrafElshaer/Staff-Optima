import type { ApplicationStage } from "@optima/supabase/types";
import type { applicationStageSchema } from "@optima/supabase/validations";

import { cn } from "@optima/ui/lib/utils";

import { Handle, type Node, type NodeProps, Position } from "@xyflow/react";

import type { z } from "zod";
import { DeleteStage } from "./delete-stage";
import { ReorderStages } from "./reorder-stages";

export type StageNode = Node<
	z.infer<typeof applicationStageSchema>,
	"stageNode"
>;

export function StageNode(props: NodeProps<StageNode>) {
	const { data, selected } = props;
	const { title, description, indicator_color, stage_order, id } = data;

	return (
		<>
			<div
				className={cn(
					"p-4 space-y-2 w-[30rem] outline-1 outline-border rounded-md bg-background nodrag relative",
					selected && "outline-primary/50",
				)}
			>
				<div className="flex items-center gap-2">
					<div
						className={`size-5 rounded-sm bg-[${indicator_color}]`}
						style={{
							backgroundColor: indicator_color,
						}}
					/>
					<p className="font-semibold flex-1">{title}</p>
					<ReorderStages stage_order={String(stage_order)} id={id} />
					<DeleteStage stage={data as unknown as ApplicationStage} />
				</div>

				<p className=" text-secondary-foreground">{description}</p>
			</div>
			<Handle type="source" position={Position.Bottom} />
			<Handle type="target" position={Position.Top} />
		</>
	);
}
