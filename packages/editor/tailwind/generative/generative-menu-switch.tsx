// @ts-ignore
import { EditorBubble, removeAIHighlight, useEditor } from "novel";
import { Fragment, type ReactNode, useEffect } from "react";
import { Button } from "../ui/button";
import Magic from "../ui/icons/magic";
import { AISelector } from "./ai-selector";

interface GenerativeMenuSwitchProps {
	children: ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}
const GenerativeMenuSwitch = ({
	children,
	open,
	onOpenChange,
}: GenerativeMenuSwitchProps) => {
	const { editor } = useEditor();

	useEffect(() => {
		if (!open && editor) removeAIHighlight(editor);
	}, [open, editor]);

	const isAlignCenter =
		editor?.isActive({
			textAlign: "center",
		}) || false;

	const isAlignRight =
		editor?.isActive({
			textAlign: "right",
		}) || false;

	return (
		<EditorBubble
			tippyOptions={{
				placement: open
					? "bottom-start"
					: isAlignCenter
						? "top-end"
						: isAlignRight
							? "left"
							: "auto",
				onHidden: () => {
					onOpenChange(false);
					if (editor) editor.chain().unsetHighlight().run();
				},
			}}
			className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
		>
			{open && <AISelector open={open} onOpenChange={onOpenChange} />}
			{!open && (
				<Fragment>
					<Button
						className="gap-1 h-8 rounded-none text-purple-500"
						variant="ghost"
						onClick={() => onOpenChange(true)}
						size="sm"
					>
						<Magic className="h-4 w-4" />
						Ask AI
					</Button>
					{children}
				</Fragment>
			)}
		</EditorBubble>
	);
};

export default GenerativeMenuSwitch;
