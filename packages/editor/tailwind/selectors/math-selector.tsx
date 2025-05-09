import { Button } from "@optima/ui/components/button";
import { cn } from "@optima/ui/lib/utils";
import { SigmaIcon } from "lucide-react";
// @ts-ignore
import { useEditor } from "novel";

export const MathSelector = () => {
	const { editor } = useEditor();

	if (!editor) return null;

	return (
		<Button
			variant="ghost"
			size="sm"
			type="button"
			className="rounded-none w-12"
			onClick={(evt) => {
				if (editor.isActive("math")) {
					editor.chain().focus().unsetLatex().run();
				} else {
					const { from, to } = editor.state.selection;
					const latex = editor.state.doc.textBetween(from, to);

					if (!latex) return;

					editor.chain().focus().setLatex({ latex }).run();
				}
			}}
		>
			<SigmaIcon
				className={cn("size-4", { "text-blue-500": editor.isActive("math") })}
				strokeWidth={2.3}
			/>
		</Button>
	);
};
