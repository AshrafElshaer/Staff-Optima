import { Button } from "@optima/ui/components/button";
import { cn } from "@optima/ui/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

export function CopyToClipboard({ text }: { text: string }) {
	const [copiedText, copy] = useCopyToClipboard();
	const [copied, setCopied] = useState(false);
	const handleCopy = () => {
		copy(text);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};
	return (
		<Button
			variant="ghost"
			size="icon"
			className="disabled:opacity-100 relative"
			onClick={handleCopy}
			aria-label={copied ? "Copied" : "Copy to clipboard"}
			disabled={copied}
		>
			<div
				className={cn(
					"transition-all",
					copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
				)}
			>
				<Check
					className="stroke-emerald-500"
					size={16}
					strokeWidth={2}
					aria-hidden="true"
				/>
			</div>
			<div
				className={cn(
					"absolute transition-all",
					copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
				)}
			>
				<Copy size={16} strokeWidth={2} aria-hidden="true" />
			</div>
		</Button>
	);
}
