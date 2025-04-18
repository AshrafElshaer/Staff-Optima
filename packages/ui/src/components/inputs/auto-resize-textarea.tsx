"use client";

import { Textarea } from "@optima/ui/components/textarea";
import { cn } from "@optima/ui/lib/utils";
import type { ChangeEvent, TextareaHTMLAttributes } from "react";

interface AutoResizeTextAreaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	defaultRows?: number;
}

export function AutoResizeTextArea({
	onChange,
	className,
	defaultRows = 1,
	...props
}: AutoResizeTextAreaProps) {
	const maxRows = undefined; // You can set a max number of rows

	const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const textarea = e.target;
		onChange?.(e);
		textarea.style.height = "auto";

		const style = window.getComputedStyle(textarea);
		const borderHeight =
			Number.parseInt(style.borderTopWidth) +
			Number.parseInt(style.borderBottomWidth);
		const paddingHeight =
			Number.parseInt(style.paddingTop) + Number.parseInt(style.paddingBottom);

		const lineHeight = Number.parseInt(style.lineHeight);
		const maxHeight = maxRows
			? lineHeight * maxRows + borderHeight + paddingHeight
			: Number.POSITIVE_INFINITY;

		const newHeight = Math.min(textarea.scrollHeight + borderHeight, maxHeight);

		textarea.style.height = `${newHeight}px`;
	};

	return (
		<Textarea
			placeholder="Leave a comment"
			onChange={handleInput}
			rows={defaultRows}
			className={cn("min-h-[none] !resize-none", className)}
			{...props}
		/>
	);
}
