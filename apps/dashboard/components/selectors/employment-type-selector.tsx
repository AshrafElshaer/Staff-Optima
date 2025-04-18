"use client";

import {
	type EmploymentType,
	employmentTypeEnum,
} from "@optima/supabase/types";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@optima/ui/components/select";

export function EmploymentTypeSelector({
	onChange,
	value,
}: {
	onChange: (value: string | undefined) => void;
	value: string | undefined;
}) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="capitalize bg-accent w-full">
				<SelectValue placeholder="Select an employment type" />
			</SelectTrigger>
			<SelectContent>
				{Object.values(employmentTypeEnum).map((type) => (
					<SelectItem key={type} value={type} className="capitalize">
						{type.replace("_", " ")}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
