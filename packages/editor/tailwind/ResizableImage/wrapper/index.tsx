import { cn } from "@optima/ui/lib/utils";
import { type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

import type { Node as ProsemirrorNode } from "prosemirror-model";
import { Resizable, type ResizeDirection } from "re-resizable";
// import type { Direction } from "re-resizable/lib/resizer";
import React, { useState } from "react";

export default function ResizableImageWrapper(props: NodeViewProps) {
	const { selected, editor } = props;
	const defaultWidth = props.node.attrs.width;
	const defaultHeight = props.node.attrs.height;
	const isEditable = editor.isEditable;
	const [isResizing, setIsResizing] = useState(false);

	return (
		<NodeViewWrapper
			draggable
			className={cn("image-resizer w-full", {
				"pointer-events-none": isResizing,
			})}
			// onDragStart={(e) => {
			// 	// Set node data for TipTap's internal drag handling
			// 	e.dataTransfer?.setData("text/plain", "");
			// 	e.dataTransfer?.setData(
			// 		"application/json",
			// 		JSON.stringify(props.node.toJSON()),
			// 	);
			// }}
		>
			<Resizable
				enable={
					isEditable
						? {
								top: true,
								right: true,
								bottom: true,
								left: true,
								bottomLeft: true,
								bottomRight: true,
								topLeft: true,
								topRight: true,
							}
						: false
				}
				className={cn("resizable-image mx-auto")}
				defaultSize={{
					width: defaultWidth ? defaultWidth : "300",
					height: defaultHeight ? defaultHeight : "300",
				}}
				onResizeStart={() => {
					setIsResizing(true);
				}}
				onResizeStop={() => {
					setIsResizing(false);
				}}
				onResize={(
					e: MouseEvent | TouchEvent,
					direction: ResizeDirection,
					ref: HTMLElement,
				) => {
					props.updateAttributes({
						width: ref.style.width,
						height: ref.style.height,
					});
				}}
				maxWidth={"100%"}
				lockAspectRatio={true}
				handleStyles={{
					left: {
						display: selected ? "block" : "none",
						backgroundColor: "var(--primary)",
						width: "1px",
					},
					top: {
						display: selected ? "block" : "none",
						backgroundColor: "var(--primary)",
						height: "1px",
					},
					right: {
						display: selected ? "block" : "none",
						backgroundColor: "var(--primary)",
						width: "1px",
					},
					bottom: {
						display: selected ? "block" : "none",
						backgroundColor: "var(--primary)",
						height: "1px",
					},
					bottomRight: {
						display: selected ? "block" : "none",
						backgroundColor: "var(--primary)",
						width: "10px",
						height: "10px",
						borderRadius: "50%",
					},
					bottomLeft: {
						display: selected ? "block" : "none",
						backgroundColor: "var(--primary)",
						width: "10px",
						height: "10px",
						borderRadius: "50%",
					},
					topRight: {
						display: selected ? "block" : "none",
						backgroundColor: "var(--primary)",
						width: "10px",
						height: "10px",
						borderRadius: "50%",
					},
					topLeft: {
						display: selected ? "block" : "none",
						backgroundColor: "var(--primary)",
						width: "10px",
						height: "10px",
						borderRadius: "50%",
					},
				}}
			>
				<img
					src={props.node.attrs.src}
					alt={props.node.attrs.alt}
					draggable={false}
					style={{
						marginInline: "auto",
						width: "100%",
						height: "100%",
						objectFit: "contain",
					}}
				/>
			</Resizable>
		</NodeViewWrapper>
	);
}
