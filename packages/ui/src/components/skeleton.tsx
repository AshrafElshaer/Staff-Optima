import { cn } from "@optima/ui/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn("bg-foreground/20 animate-pulse rounded-md", className)}
			{...props}
		/>
	);
}

export { Skeleton };
