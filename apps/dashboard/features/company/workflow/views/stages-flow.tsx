"use client";
import { Button } from "@optima/ui/components/button";

import { useStagesStore } from "@/stores/stages-pipeline";
import type { ApplicationStage } from "@optima/supabase/types";
import {
	Background,
	Controls,
	type Edge,
	type Node,
	type OnSelectionChangeFunc,
	ReactFlow,
	useEdgesState,
	useNodesState,
	useOnSelectionChange,
} from "@xyflow/react";
import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";
import { ActionPanel } from "./action-panel";
import { StageNode } from "./stage-node";

type StagesFlowProps = {
	applicationStages: ApplicationStage[];
};

export function StagesFlow({ applicationStages }: StagesFlowProps) {
	const initNodes = applicationStages.map((stage, idx) => ({
		id: stage.id,
		type: "stageNode",
		deletable: false,
		position: { x: 0, y: idx * 250 },
		data: stage,
	}));

	const initEdges = applicationStages.map((stage, idx) => ({
		id: `e${stage.id}-${applicationStages[idx + 1]?.id}`,
		source: stage.id,
		target: applicationStages[idx + 1]?.id ?? "rejected",
		// animated: true,
		// type: "stageEdge",
	}));

	const { resolvedTheme = "dark" } = useTheme();
	const setSelectedStage = useStagesStore((store) => store.setSelectedStage);
	const setSelectedEdges = useStagesStore((store) => store.setSelectedEdges);

	const [nodes, , onNodesChange] = useNodesState(initNodes);
	const [edges, , onEdgesChange] = useEdgesState(initEdges);
	const nodeTypes = useMemo(() => ({ stageNode: StageNode }), []);

	// the passed handler has to be memoized, otherwise the hook will not work correctly
	const onChange: OnSelectionChangeFunc = useCallback(({ nodes, edges }) => {
		setSelectedStage(nodes[0] as Node);
		setSelectedEdges(edges[0] as Edge);
	}, []);
	useOnSelectionChange({
		onChange,
	});

	return (
		<>
			<ReactFlow
				colorMode={resolvedTheme === "dark" ? "dark" : "light"}
				className="border rounded-md min-h-screen sm:min-h-0"
				nodes={nodes}
				onNodesChange={onNodesChange}
				edges={edges}
				onEdgesChange={onEdgesChange}
				nodeTypes={nodeTypes}
				// edgeTypes={edgeTypes}
				minZoom={0.5}
				maxZoom={1}
				defaultViewport={{
					x: 24,
					y: 24,
					zoom: 0.85,
				}}
				fitView
			>
				<Background />
				<Controls showInteractive={false} className="react-flow_controls" />
				<ActionPanel />
			</ReactFlow>
		</>
	);
}
