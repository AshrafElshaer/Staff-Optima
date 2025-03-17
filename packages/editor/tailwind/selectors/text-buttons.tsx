import { Button } from "@optima/ui/components/button";
import { cn } from "@optima/ui/lib/utils";
import {
	AlignCenterIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BoldIcon,
	CodeIcon,
	ItalicIcon,
	StrikethroughIcon,
	UnderlineIcon,
} from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";
import type { SelectorItem } from "./node-selector.js";

export const TextButtons = () => {
	const { editor } = useEditor();
	if (!editor) return null;
	const items: SelectorItem[] = [
		{
			name: "bold",
			isActive: (editor) => editor?.isActive("bold") || false,
			command: (editor) => editor?.chain().focus().toggleBold().run(),
			icon: BoldIcon,
		},
		{
			name: "italic",
			isActive: (editor) => editor?.isActive("italic") || false,
			command: (editor) => editor?.chain().focus().toggleItalic().run(),
			icon: ItalicIcon,
		},
		{
			name: "underline",
			isActive: (editor) => editor?.isActive("underline") || false,
			command: (editor) => editor?.chain().focus().toggleUnderline().run(),
			icon: UnderlineIcon,
		},
		{
			name: "strike",
			isActive: (editor) => editor?.isActive("strike") || false,
			command: (editor) => editor?.chain().focus().toggleStrike().run(),
			icon: StrikethroughIcon,
		},
		{
			name: "code",
			isActive: (editor) => editor?.isActive("code") || false,
			command: (editor) => editor?.chain().focus().toggleCode().run(),
			icon: CodeIcon,
		},
		{
			name: "left",
			isActive: (editor) =>
				editor?.isActive({
					textAlign: "left",
				}) || false,
			command: (editor) => editor?.chain().focus().setTextAlign("left").run(),
			icon: AlignLeftIcon,
		},
		{
			name: "center",
			isActive: (editor) =>
				editor?.isActive({
					textAlign: "center",
				}) || false,
			command: (editor) => editor?.chain().focus().setTextAlign("center").run(),
			icon: AlignCenterIcon,
		},
		{
			name: "right",
			isActive: (editor) =>
				editor?.isActive({
					textAlign: "right",
				}) || false,
			command: (editor) => editor?.chain().focus().setTextAlign("right").run(),
			icon: AlignRightIcon,
		},
	];
	return (
		<div className="flex">
			{items.map((item) => (
				<EditorBubbleItem
					key={item.name}
					onSelect={(editor) => {
						item.command(editor);
					}}
				>
					<Button
						size="sm"
						className="rounded-none"
						variant={item.isActive(editor) ? "secondary" : "ghost"}
						type="button"
					>
						<item.icon className="h-4 w-4" />
					</Button>
				</EditorBubbleItem>
			))}
		</div>
	);
};
