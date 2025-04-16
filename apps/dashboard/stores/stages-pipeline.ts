import type { Edge } from "@xyflow/react";
import type { Node } from "@xyflow/react";
import { create } from "zustand";

export const useStagesStore = create<{
	selectedStage: Node | null;
	selectedEdges: Edge | null;

	setSelectedStage: (stage: Node) => void;
	setSelectedEdges: (edges: Edge) => void;
}>((set) => ({
	selectedStage: null,
	selectedEdges: null,

	setSelectedStage: (stage: Node) => set({ selectedStage: stage }),
	setSelectedEdges: (edges: Edge) => set({ selectedEdges: edges }),
}));
