// @ts-ignore
import { TextAlign } from "@tiptap/extension-text-align";
import {
	AIHighlight,
	CharacterCount,
	Color,
	HighlightExtension,
	HorizontalRule,
	Placeholder,
	StarterKit,
	TaskItem,
	TaskList,
	TextStyle,
	TiptapImage,
	TiptapLink,
	TiptapUnderline,
	UpdatedImage,
	UploadImagesPlugin,
	// @ts-ignore
} from "novel";
// @ts-ignore
import { Markdown } from "tiptap-markdown";

import { cn } from "@optima/ui/lib/utils";
// @ts-ignore
import { ReactNodeViewRenderer } from "@tiptap/react";
import ResizableImageWrapper from "./ResizableImage/wrapper/index.js";

const aiHighlight = AIHighlight;

const highlight = HighlightExtension;
const underline = TiptapUnderline;
const placeholder = Placeholder;
const tiptapLink = TiptapLink.configure({
	HTMLAttributes: {
		class: cn(" underline underline-offset-[3px] cursor-pointer "),
	},
});

const textAlign = TextAlign.configure({
	alignments: ["left", "center", "right"],
	types: ["heading", "paragraph"],
	defaultAlignment: "left",
});

const color = Color;

const textStyle = TextStyle;
const tiptapImage = TiptapImage.extend({
	addProseMirrorPlugins() {
		return [
			UploadImagesPlugin({
				imageClass: cn("opacity-40 rounded-lg border border-stone-200 mx-auto"),
			}),
		];
	},
	addNodeView() {
		return ReactNodeViewRenderer(ResizableImageWrapper);
	},
}).configure({
	allowBase64: true,
	HTMLAttributes: {
		class: cn("rounded-lg border border-muted mx-auto"),
	},
});

// const updatedImage = UpdatedImage.configure({
// 	HTMLAttributes: {
// 		class: cn("rounded-lg border border-muted mx-auto"),
// 	},
// });

const MarkdownExtension = Markdown.configure({
	html: false,
	transformCopiedText: true,
});

const taskList = TaskList.configure({
	HTMLAttributes: {
		class: cn("not-prose pl-2 "),
	},
});
const taskItem = TaskItem.configure({
	HTMLAttributes: {
		class: cn("flex gap-2 items-start my-2"),
	},
	nested: true,
});

const horizontalRule = HorizontalRule.configure({
	HTMLAttributes: {
		class: cn("mt-4 mb-6 border-t border-muted-foreground"),
	},
});

const starterKit = StarterKit.configure({
	bulletList: {
		HTMLAttributes: {
			class: cn("list-disc not-prose list-outside leading-3 -mt-2 "),
		},
	},
	orderedList: {
		HTMLAttributes: {
			class: cn("!list-decimal not-prose !list-outside leading-3 mt-2 ml-6"),
		},
	},
	listItem: {
		HTMLAttributes: {
			class: cn("leading-normal mb-2 ml-4 "),
		},
	},
	blockquote: {
		HTMLAttributes: {
			class: cn("border-l-4 border-primary pl-4"),
		},
	},
	codeBlock: {
		HTMLAttributes: {
			class: cn(
				"rounded-md bg-muted text-foreground border p-5 font-mono font-medium",
			),
		},
	},
	code: {
		HTMLAttributes: {
			class: cn(
				"rounded-md bg-muted text-foreground  px-1.5 py-1 font-mono font-medium",
			),
			spellcheck: "false",
		},
	},
	horizontalRule: false,
	dropcursor: {
		color: "#DBEAFE",
		class: "border-border",
		width: 4,
	},
	gapcursor: false,
});

const characterCount = CharacterCount.configure();

export const defaultExtensions = [
	starterKit,
	tiptapLink,
	tiptapImage,
	characterCount,
	taskList,
	taskItem,
	horizontalRule,
	aiHighlight,
	textAlign,
	color,
	textStyle,
	highlight,
	underline,
	placeholder,
	MarkdownExtension,
	// updatedImage,
];
