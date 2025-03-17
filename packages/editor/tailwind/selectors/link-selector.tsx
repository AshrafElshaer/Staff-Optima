import { Button } from "@optima/ui/components/button";
import { PopoverContent } from "@optima/ui/components/popover";
import { cn } from "@optima/ui/lib/utils";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, Link, Trash } from "lucide-react";
// @ts-ignore
import { useEditor } from "novel";
import { useEffect, useRef, useState } from "react";

export function isValidUrl(url: string) {
	try {
		new URL(url);
		return true;
	} catch (_e) {
		return false;
	}
}
export function getUrlFromString(str: string) {
	if (isValidUrl(str)) return str;
	try {
		if (str.includes(".") && !str.includes(" ")) {
			return new URL(`https://${str}`).toString();
		}
	} catch (_e) {
		return null;
	}
}
interface LinkSelectorProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const LinkSelector = ({ open, onOpenChange }: LinkSelectorProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { editor } = useEditor();

	// Autofocus on input by default
	useEffect(() => {
		inputRef.current?.focus();
	});
	if (!editor) return null;

	const isActive = editor.isActive("link");

	return (
		<Popover modal={true} open={open} onOpenChange={onOpenChange}>
			<PopoverTrigger asChild>
				<Button
					size="sm"
					variant={isActive ? "secondary" : "ghost"}
					className="gap-2 rounded-none border-none"
					type="button"
				>
					<Link className="size-3" />
					<p
						className={cn("underline decoration-stone-400 underline-offset-4")}
					>
						Link
					</p>
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-60 p-0" sideOffset={10}>
				<form
					onSubmit={(e) => {
						const target = e.currentTarget as HTMLFormElement;
						e.preventDefault();
						const input = target[0] as HTMLInputElement;
						const url = getUrlFromString(input.value);
						if (url) {
							editor.chain().focus().setLink({ href: url }).run();
							onOpenChange(false);
						}
					}}
					className="flex  p-1 "
				>
					<input
						ref={inputRef}
						type="text"
						placeholder="Paste a link"
						className="flex-1 bg-background p-1 text-sm outline-none"
						defaultValue={editor.getAttributes("link").href || ""}
					/>
					{editor.getAttributes("link").href ? (
						<Button
							size="icon"
							variant="destructive"
							type="button"
							className="flex h-8 items-center rounded-sm p-1 transition-all"
							onClick={() => {
								editor.chain().focus().unsetLink().run();
								if (inputRef.current) {
									inputRef.current.value = "";
								}
								onOpenChange(false);
							}}
						>
							<Trash className="h-4 w-4" />
						</Button>
					) : (
						<Button
							size="icon"
							className="h-8"
							type="button"
							onClick={() => {
								const value = inputRef.current?.value;
								if (!value) return;
								const url = getUrlFromString(value);
								if (url) {
									editor.chain().focus().setLink({ href: url }).run();
									onOpenChange(false);
								}
							}}
						>
							<Check className="h-4 w-4" />
						</Button>
					)}
				</form>
			</PopoverContent>
		</Popover>
	);
};
