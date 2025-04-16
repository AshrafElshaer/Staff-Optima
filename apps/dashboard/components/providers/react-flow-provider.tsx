"use client";

import {
	ReactFlow,
	type ReactFlowProps,
	ReactFlowProvider,
	useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

function Flow(props: ReactFlowProps) {
	// you can access the internal state here
	const reactFlowInstance = useReactFlow();

	return <ReactFlow {...props} />;
}

// wrapping with ReactFlowProvider is done outside of the component
export function FlowWithProvider({ children }: { children: React.ReactNode }) {
	return <ReactFlowProvider>{children}</ReactFlowProvider>;
}
