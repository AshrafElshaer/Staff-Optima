import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@optima/ui/lib/utils";

const alertVariants = cva(
	"relative w-full rounded-md border px-4 pl-6 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7 ",
	{
		variants: {
			variant: {
				default: "",
				destructive: " [&>svg]:text-destructive",
				warning: " [&>svg]:text-warning",
				info: " [&>svg]:text-info",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const Alert = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, children, ...props }, ref) => (
	<div
		ref={ref}
		role="alert"
		className={cn(alertVariants({ variant }), "relative", className)}
		{...props}
	>
		{children}
		<div
			className={cn(
				"absolute left-2 rounded-full top-2 bottom-2 w-1 bg-subtitle",
				variant === "destructive" && "bg-destructive",
				variant === "warning" && "bg-warning",
				variant === "info" && "bg-blue-500",
			)}
		/>
	</div>
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h5
		ref={ref}
		className={cn("mb-2 font-bold leading-none tracking-tight", className)}
		{...props}
	/>
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("text-sm [&_p]:leading-relaxed text-subtitle", className)}
		{...props}
	/>
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
