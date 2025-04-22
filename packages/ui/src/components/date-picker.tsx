"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@optima/ui/components/button";
import { Calendar } from "@optima/ui/components/calendar";
import { Icons } from "@optima/ui/components/icons";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@optima/ui/components/popover";
import { cn } from "@optima/ui/lib/utils";
import { Calendar03Icon } from "hugeicons-react";

type DatePickerProps = {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
	fromDate?: Date;
	toDate?: Date;
};

export function DatePicker({
	date,
	setDate,
	fromDate,
	toDate,
}: DatePickerProps) {
	return (
		<Popover modal>
			<PopoverTrigger asChild>
				<Button
					variant={"secondary"}
					className={cn(
						"w-full justify-start text-left h-9",
						!date && "text-muted-foreground",
					)}
				>
					<Icons.CalendarFill className="w-4 h-4" strokeWidth={2} />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
					fromDate={fromDate}
					toDate={toDate}
				/>
			</PopoverContent>
		</Popover>
	);
}
