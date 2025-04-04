"use client";

import { cn } from "../../lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../select";

export function GenderSelector({
	value,
	setValue,
}: {
	value: string;
	setValue: (value: string) => void;
}) {
	return (
		<Select value={value} onValueChange={setValue}>
			<SelectTrigger
				className={cn("capitalize", !value && "text-muted-foreground")}
			>
				<SelectValue placeholder="Select a gender" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="male">Male</SelectItem>
				<SelectItem value="female">Female</SelectItem>
				<SelectItem value="other">Other</SelectItem>
			</SelectContent>
		</Select>
	);
}
