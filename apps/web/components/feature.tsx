import { cn } from "@optima/ui/lib/utils";
import type { HugeiconsProps } from "hugeicons-react";
import type { FC, RefAttributes } from "react";

export interface FeatureProps {
	title: string;
	description: string;
	index: number;
}

export function Feature({ title, description, index }: FeatureProps) {
	return (
		<div
			className={cn(
				"space-y-6 py-8 border p-4 hover:bg-muted transition-all",
				index === 0 && "lg:col-span-2 ",
				index === 3 && "lg:col-span-2 ",
				index === 4 && "lg:col-span-2 ",
			)}
		>
			<h2 className="text-xl font-bold">{title}</h2>

			<p className="text-sm/6 text-muted-foreground ">{description}</p>
		</div>
	);
}
