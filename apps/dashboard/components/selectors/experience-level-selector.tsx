"use client";

import {
	type ExperienceLevel,
	experienceLevelEnum,
} from "@optima/supabase/types";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@optima/ui/components/select";

export function ExperienceLevelSelector({
	onChange,
	value,
}: {
	onChange: (value: string | undefined) => void;
	value: string | undefined;
}) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="capitalize bg-accent w-full">
				<SelectValue placeholder="Select an experience level" />
			</SelectTrigger>
			<SelectContent>
				{Object.values(experienceLevelEnum).map((level) => (
					<SelectItem key={level} value={level} className="capitalize">
						{level.replace("_", " ")}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
