import { getCompanyById } from "@optima/supabase/queries";
import {
	CheckSquare,
	Code,
	Heading1,
	Heading2,
	Heading3,
	ImageIcon,
	List,
	ListOrdered,
	MessageSquarePlus,
	Text,
	TextQuote,
	Twitter,
	Youtube,
} from "lucide-react";
// @ts-ignore
import { Command, createSuggestionItems, renderItems } from "novel";

import { createBrowserClient } from "@optima/supabase/client";
import { toast } from "sonner";
import { uploadFn } from "./image-upload";

export const suggestionItems = createSuggestionItems([
	// {
	// 	title: "Send Feedback",
	// 	description: "Let us know how we can improve.",
	// 	icon: <MessageSquarePlus size={18} />,
	// 	command: ({ editor, range }) => {
	// 		editor.chain().focus().deleteRange(range).run();
	// 		window.open("/feedback", "_blank");
	// 	},
	// },
	{
		title: "Text",
		description: "Just start typing with plain text.",
		searchTerms: ["p", "paragraph"],
		icon: <Text size={18} />,
		command: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.toggleNode("paragraph", "paragraph")
				.run();
		},
	},
	{
		title: "To-do List",
		description: "Track tasks with a to-do list.",
		searchTerms: ["todo", "task", "list", "check", "checkbox"],
		icon: <CheckSquare size={18} />,
		command: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleTaskList().run();
		},
	},
	{
		title: "Heading 1",
		description: "Big section heading.",
		searchTerms: ["title", "big", "large"],
		icon: <Heading1 size={18} />,
		command: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode("heading", { level: 1 })
				.run();
		},
	},
	{
		title: "Heading 2",
		description: "Medium section heading.",
		searchTerms: ["subtitle", "medium"],
		icon: <Heading2 size={18} />,
		command: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode("heading", { level: 2 })
				.run();
		},
	},
	{
		title: "Heading 3",
		description: "Small section heading.",
		searchTerms: ["subtitle", "small"],
		icon: <Heading3 size={18} />,
		command: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode("heading", { level: 3 })
				.run();
		},
	},
	{
		title: "Bullet List",
		description: "Create a simple bullet list.",
		searchTerms: ["unordered", "point"],
		icon: <List size={18} />,
		command: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleBulletList().run();
		},
	},
	{
		title: "Numbered List",
		description: "Create a list with numbering.",
		searchTerms: ["ordered"],
		icon: <ListOrdered size={18} />,
		command: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleOrderedList().run();
		},
	},
	{
		title: "Quote",
		description: "Capture a quote.",
		searchTerms: ["blockquote"],
		icon: <TextQuote size={18} />,
		command: ({ editor, range }) =>
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.toggleNode("paragraph", "paragraph")
				.toggleBlockquote()
				.run(),
	},
	{
		title: "Code",
		description: "Capture a code snippet.",
		searchTerms: ["codeblock"],
		icon: <Code size={18} />,
		command: ({ editor, range }) =>
			editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
	},
	{
		title: "Image",
		description: "Upload an image from your computer.",
		searchTerms: ["photo", "picture", "media"],
		icon: <ImageIcon size={18} />,
		command: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).run();
			// upload image
			const input = document.createElement("input");
			input.type = "file";
			input.accept = "image/*";
			input.onchange = async () => {
				if (input.files?.length) {
					const file = input.files[0] as File;
					const pos = editor.view.state.selection.from;

					uploadFn(file, editor.view, pos);
				}
			};
			input.click();
		},
	},
	// {
	// 	title: "Logo",
	// 	description: "Inset company Logo",
	// 	searchTerms: ["logo", "image"],
	// 	icon: <ImageIcon size={18} />,
	// 	command: async ({ editor, range }) => {
	// 		const { data: session } = await authClient.getSession();

	// 		if (!session || !session.user) return;
	// 		const organization = await getUserOrganization(session.user.id);
	// 		if (!organization) return;
	// 		const logo = organization.logo;
	// 		if (!logo) return;
	// 		editor
	// 			.chain()
	// 			.focus()
	// 			.deleteRange(range)
	// 			.setImage({
	// 				src: logo,
	// 				alt: "Organization Logo",
	// 				title: organization?.name,
	// 			})
	// 			.run();
	// 	},
	// },
	{
		title: "Youtube",
		description: "Embed a Youtube video.",
		searchTerms: ["video", "youtube", "embed"],
		icon: <Youtube size={18} />,
		command: ({ editor, range }) => {
			const videoLink = prompt("Please enter Youtube Video Link");
			//From https://regexr.com/3dj5t
			const ytregex = new RegExp(
				/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
			);

			if (videoLink && ytregex.test(videoLink)) {
				editor
					.chain()
					.focus()
					.deleteRange(range)
					.setYoutubeVideo({
						src: videoLink,
					})
					.run();
			} else {
				if (videoLink !== null) {
					alert("Please enter a correct Youtube Video Link");
				}
			}
		},
	},
	{
		title: "Twitter",
		description: "Embed a Tweet.",
		searchTerms: ["twitter", "embed"],
		icon: <Twitter size={18} />,
		command: ({ editor, range }) => {
			const tweetLink = prompt("Please enter Twitter Link");
			const tweetRegex = new RegExp(
				/^https?:\/\/(www\.)?x\.com\/([a-zA-Z0-9_]{1,15})(\/status\/(\d+))?(\/\S*)?$/,
			);

			if (tweetLink && tweetRegex.test(tweetLink)) {
				editor
					.chain()
					.focus()
					.deleteRange(range)
					.setTweet({
						src: tweetLink,
					})
					.run();
			} else {
				if (tweetLink !== null) {
					alert("Please enter a correct Twitter Link");
				}
			}
		},
	},
]);

export const getSuggestionItems = () => {
	const items = [...suggestionItems];
	items.splice(10, 0, {
		title: "Logo",
		description: "Insert company Logo",
		searchTerms: ["logo", "image"],
		icon: <ImageIcon size={18} />,
		command: async ({ editor, range }) => {
			toast.promise(
				async () => {
					const supabase = createBrowserClient();
					const { data: session } = await supabase.auth.getUser();
					if (!session || !session.user) {
						throw new Error("User not found");
					}

					const { data: company, error } = await getCompanyById(
						supabase,
						session.user.user_metadata.company_id,
					);

					if (!company) {
						throw new Error("Company not found");
					}
					const logo = company.logo;
					if (!logo) {
						throw new Error("Company logo not found");
					}
					editor
						.chain()
						.focus()
						.deleteRange(range)
						.setImage({
							src: logo,
							alt: "Organization Logo",
							title: company?.name,
						})
						.run();
				},
				{
					loading: "Getting company logo",
					error: (error) => error.message ?? "Failed to get company logo",
				},
			);
		},
	});
	return items;
};

export const slashCommand = () => {
	return Command.configure({
		suggestion: {
			items: () => getSuggestionItems(),
			render: renderItems,
		},
	});
};
