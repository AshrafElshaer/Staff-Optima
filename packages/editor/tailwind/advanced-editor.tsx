"use client";
import "@optima/ui/styles/globals.css";
// @ts-ignore
import { generateJSON } from "@tiptap/react";

import { ImageIcon } from "lucide-react";
import {
	EditorCommand,
	EditorCommandEmpty,
	EditorCommandItem,
	EditorCommandList,
	EditorContent,
	type EditorInstance,
	EditorRoot,
	ImageResizer,
	type JSONContent,
	handleCommandNavigation,
	handleImageDrop,
	handleImagePaste,
	// @ts-ignore
} from "novel";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "./extensions";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { MathSelector } from "./selectors/math-selector";
import { NodeSelector } from "./selectors/node-selector";
import { Separator } from "./ui/separator";

import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import { uploadFn } from "./image-upload";
import { TextButtons } from "./selectors/text-buttons";
import {
	getSuggestionItems,
	slashCommand,
	suggestionItems,
} from "./slash-command";

const hljs = require("highlight.js");

const TailwindAdvancedEditor = ({
	content,
	onChange,
	companyId,
}: {
	content: string;
	onChange: (content: string) => void;
	companyId: string;
}) => {
	if (typeof window === "undefined") return null;
	const extensions = [...defaultExtensions, slashCommand(companyId)];
	const [initialContent, setInitialContent] = useState<null | JSONContent>(
		generateJSON(content, extensions),
	);
	const [openNode, setOpenNode] = useState(false);
	const [openColor, setOpenColor] = useState(false);
	const [openLink, setOpenLink] = useState(false);
	const [openAI, setOpenAI] = useState(false);

	//Apply Codeblock Highlighting on the HTML from editor.getHTML()
	const highlightCodeblocks = (content: string) => {
		const doc = new DOMParser().parseFromString(content, "text/html");
		for (const el of doc.querySelectorAll("pre code")) {
			// https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
			hljs.highlightElement(el);
		}
		return new XMLSerializer().serializeToString(doc);
	};

	const debouncedUpdates = useDebouncedCallback(
		async (editor: EditorInstance) => {
			const html = editor.getHTML();
			onChange(html);
		},
		500,
	);

	return (
		<div className="relative w-full max-w-screen-lg">
			<EditorRoot>
				<EditorContent
					immediatelyRender={false}
					initialContent={initialContent ?? undefined}
					extensions={extensions}
					className="relative h-full w-full max-w-screen-lg border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"
					editorProps={{
						handleDOMEvents: {
							keydown: (_view, event) => handleCommandNavigation(event),
						},
						handlePaste: (view, event) =>
							handleImagePaste(view, event, uploadFn),
						handleDrop: (view, event, _slice, moved) =>
							handleImageDrop(view, event, moved, uploadFn),
						attributes: {
							class:
								"prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none outline-none max-w-full",
						},
					}}
					onUpdate={({ editor }) => {
						debouncedUpdates(editor);
					}}
				>
					<EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
						<EditorCommandEmpty className="px-2 text-muted-foreground">
							No results
						</EditorCommandEmpty>
						<EditorCommandList>
							{getSuggestionItems(companyId).map((item) => (
								<EditorCommandItem
									value={item.title}
									onCommand={(val) => item.command?.(val)}
									className="flex w-full items-start gap-4 rounded-md px-2 text-left text-sm hover:bg-accent aria-selected:bg-accent"
									key={item.title}
								>
									<div className="flex h-10 w-10 items-center justify-center ">
										{item.icon}
									</div>
									<div>
										<p className="font-medium">{item.title}</p>
										<p className="text-xs text-muted-foreground">
											{item.description}
										</p>
									</div>
								</EditorCommandItem>
							))}
						</EditorCommandList>
					</EditorCommand>

					<GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
						<Separator orientation="vertical" />
						<NodeSelector open={openNode} onOpenChange={setOpenNode} />
						<Separator orientation="vertical" />

						<LinkSelector open={openLink} onOpenChange={setOpenLink} />
						<Separator orientation="vertical" />
						<MathSelector />
						<Separator orientation="vertical" />
						<TextButtons />
						<Separator orientation="vertical" />
						<ColorSelector open={openColor} onOpenChange={setOpenColor} />
					</GenerativeMenuSwitch>
				</EditorContent>
			</EditorRoot>
		</div>
	);
};

export default TailwindAdvancedEditor;
