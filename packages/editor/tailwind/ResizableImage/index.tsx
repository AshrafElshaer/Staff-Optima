import { Node, mergeAttributes, nodeInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ResizableImageWrapper from "./wrapper/index.js";

interface ImageOptions {
	inline: boolean;
	allowBase64: boolean;
	HTMLAttributes: Record<string, string>;
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		// @ts-ignore
		image: {
			/**
			 * Add an image
			 */
			setImage: (options: {
				src: string;
				alt?: string;
				title?: string;
				height?: string;
				width?: string;
				dataID?: string;
			}) => ReturnType;
		};
	}
}

const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

export const ResizableImage = Node.create<ImageOptions>({
	name: "image",

	addOptions() {
		return {
			inline: false,
			allowBase64: false,
			HTMLAttributes: {},
		};
	},

	inline() {
		return this.options.inline;
	},

	group() {
		return this.options.inline ? "inline" : "block";
	},

	draggable: true,

	addAttributes() {
		return {
			src: {
				default: null,
			},
			style: {
				default: null,
			},
			alt: {
				default: null,
			},
			title: {
				default: null,
			},
			height: {
				default: null,
			},
			width: {
				default: null,
			},
			dataID: {
				default: null,
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "img",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		const { height, width, alt, style } = HTMLAttributes;
		const marginValue = alt.split("-")[1];

		const attributes = {
			...HTMLAttributes,
			style: `height: ${height} !important; width: ${width} !important; ${style} !important;`,
		};
		return ["img", mergeAttributes(this.options.HTMLAttributes, attributes)];
	},

	addCommands() {
		return {
			setImage:
				(options) =>
				({ commands }) => {
					return commands.insertContent({
						type: this.name,
						attrs: options,
					});
				},
		};
	},

	addNodeView() {
		return ReactNodeViewRenderer(ResizableImageWrapper);
	},

	addInputRules() {
		return [
			nodeInputRule({
				find: inputRegex,
				type: this.type,
				getAttributes: (match) => {
					const [, , alt, src, title, height, width, style] = match;
					return { src, alt, title, height, width, style };
				},
			}),
		];
	},
});
