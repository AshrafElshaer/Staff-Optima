import { Button } from "@optima/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@optima/ui/components/dropdown-menu";
import {
	BaseEdge,
	EdgeLabelRenderer,
	getStraightPath,
	useReactFlow,
} from "@xyflow/react";
import { Plus } from "lucide-react";

export function StageEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
}: {
	id: string;
	sourceX: number;
	sourceY: number;
	targetX: number;
	targetY: number;
}) {
	const { setEdges } = useReactFlow();
	const [edgePath, labelX, labelY] = getStraightPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
	});

	return (
		<>
			<BaseEdge id={id} path={edgePath} />
			<EdgeLabelRenderer>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							type="button"
							style={{
								position: "absolute",
								transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
								pointerEvents: "all",
							}}
							className="nodrag nopan"
							// onClick={() => {
							//   setEdges((es) => es.filter((e) => e.id !== id));
							// }}
							variant="secondary"
							size="icon"
						>
							<Plus className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side="right" align="start">
						<DropdownMenuItem>Add Stage</DropdownMenuItem>
						<DropdownMenuItem>Add Action</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</EdgeLabelRenderer>
		</>
	);
}
