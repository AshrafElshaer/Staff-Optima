import { Check, TextQuote, TrashIcon } from "lucide-react";
// @ts-ignore
import { useEditor } from "novel";
import { CommandGroup, CommandItem, CommandSeparator } from "../ui/command";

const AICompletionCommands = ({
	completion,
	onDiscard,
}: {
	completion: string;
	onDiscard: () => void;
}) => {
	const { editor } = useEditor();
	return (
		<>
			<CommandGroup>
				<CommandItem
					className="gap-2 px-4"
					value="replace"
					onSelect={() => {
						const selection = editor?.view.state.selection;
						if (!selection) return;
						editor
							?.chain()
							.focus()
							.insertContentAt(
								{
									from: selection.from,
									to: selection.to,
								},
								completion,
							)
							.run();
					}}
				>
					<Check className="h-4 w-4 text-muted-foreground" />
					Replace selection
				</CommandItem>
				<CommandItem
					className="gap-2 px-4"
					value="insert"
					onSelect={() => {
						const selection = editor?.view.state.selection;
						if (!selection) return;
						editor
							?.chain()
							.focus()
							.insertContentAt(
								{
									from: selection.to,
									to: selection.to,
								},
								completion,
							)
							.run();
					}}
				>
					<TextQuote className="h-4 w-4 text-muted-foreground" />
					Insert below
				</CommandItem>
			</CommandGroup>
			<CommandSeparator />

			<CommandGroup>
				<CommandItem onSelect={onDiscard} value="thrash" className="gap-2 px-4">
					<TrashIcon className="h-4 w-4 text-muted-foreground" />
					Discard
				</CommandItem>
			</CommandGroup>
		</>
	);
};

export default AICompletionCommands;
