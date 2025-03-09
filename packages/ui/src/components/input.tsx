import type * as React from "react";

import { cn } from "@optima/ui/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	isUrl?: boolean;
}

function Input({
	className,
	type,
	startIcon,
	endIcon,
	isUrl,
	...props
}: InputProps) {
	return (
		<div className="relative flex items-center">
			{startIcon && (
				<div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
					{startIcon}
				</div>
			)}
			<input
				type={type}
				data-slot="input"
				className={cn(
					"border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-accent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
					startIcon && "pl-10",
					endIcon && "pr-10",
					isUrl && "pl-16",
					className,
				)}
				{...props}
			/>
			{endIcon && (
				<div className="absolute right-3 flex items-center pointer-events-none text-muted-foreground">
					{endIcon}
				</div>
			)}
		</div>
	);
}

export { Input, type InputProps };
