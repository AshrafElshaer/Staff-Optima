"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@optima/ui/components/select";

import { workModeEnum } from "@optima/supabase/types";

export function WorkModeSelector({
	onChange,
	value,
}: {
	onChange: (value: string | undefined) => void;
	value: string | undefined;
}) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="capitalize bg-accent w-full">
				<SelectValue placeholder="Select a work mode" />
			</SelectTrigger>
			<SelectContent>
				{Object.values(workModeEnum).map((location) => (
					<SelectItem key={location} value={location} className="capitalize">
						{location.replace("_", " ")}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
