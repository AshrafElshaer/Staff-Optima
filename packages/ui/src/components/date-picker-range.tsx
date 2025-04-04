"use client";

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type * as React from "react";
import type { DateRange } from "react-day-picker";

import { useIsMobile } from "../hooks/use-mobile";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Calendar, type CalendarProps } from "./calendar";
import {
	Popover,
	PopoverContent,
	PopoverContentWithoutPortal,
	PopoverTrigger,
} from "./popover";

interface DatePickerWithRangeProps
	extends React.HTMLAttributes<HTMLDivElement> {
	setDate: (date: DateRange | undefined) => void;
	date: DateRange | undefined;
	fromDate?: Date;
	toDate?: Date;
	align?: "start" | "center" | "end";
}

export function DatePickerWithRange({
	className,
	setDate,
	date,
	fromDate,
	toDate,
	align = "end",
}: DatePickerWithRangeProps) {
	// const [selectedDate, setSelectedDate] = React.useState<DateRange | undefined>(
	//   date,
	// );
	//   to: addDays(new Date(), 1),
	// });
	const isMobile = useIsMobile();

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-fit justify-start text-left font-normal",
							!date && "text-muted-foreground",
						)}
					>
						<CalendarIcon size={16} />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y")} -{" "}
									{format(date.to, "LLL dd, y")}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContentWithoutPortal className="w-auto p-0" align={align}>
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						numberOfMonths={isMobile ? 1 : 2}
						onSelect={setDate}
						fromDate={fromDate}
						toDate={toDate}
					/>
				</PopoverContentWithoutPortal>
			</Popover>
		</div>
	);
}
