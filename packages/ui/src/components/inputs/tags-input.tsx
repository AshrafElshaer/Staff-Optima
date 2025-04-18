"use client";
import { cn } from "@optima/ui/lib/utils";
// Add the following to tailwind.config.ts: "./node_modules/emblor/dist/index.mjs",

import { type Tag, TagInput } from "emblor";
import { useState } from "react";

export function TagsInput({
	tags,
	onChange,
	placeholder = "Add a tag",
	className,
	containerClassName,
}: {
	tags: Tag[];
	onChange: React.Dispatch<React.SetStateAction<Tag[]>>;
	placeholder?: string;
	className?: string;
	containerClassName?: string;
}) {
	const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

	return (
		<TagInput
			tags={tags}
			setTags={(newTags) => {
				onChange(newTags);
			}}
			placeholder={placeholder}
			styleClasses={{
				inlineTagsContainer: cn(
					"border border-border rounded-lg bg-accent shadow-sm shadow-black/5 transition-shadow focus-within:border-border focus-within:outline-none focus-within:ring-[1px] focus-within:ring-primary/70 p-1 gap-1 items-start justify-start",
					containerClassName,
				),
				input: cn(
					"w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
					className,
				),
				tag: {
					body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-sm ps-2 pe-7",
					closeButton:
						"absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
				},
			}}
			activeTagIndex={activeTagIndex}
			setActiveTagIndex={setActiveTagIndex}
		/>
	);
}
