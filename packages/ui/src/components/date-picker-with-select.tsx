"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Calendar03Icon } from "hugeicons-react";
import type { DayPicker } from "react-day-picker";
import { cn } from "../lib/utils";
import { Button, buttonVariants } from "./button";
import { Calendar } from "./calendar";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { SelectItem } from "./select";
import { SelectContent, SelectTrigger, SelectValue } from "./select";
import { Select } from "./select";

type DatePickerProps = {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
	toDate?: Date;
	fromDate?: Date;
};

const YEARS = Array.from({ length: 100 }, (_, i) => 2025 - i);
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export function DatePickerWithSelect({
	date,
	setDate,
	toDate,
	fromDate,
}: DatePickerProps) {
	const [year, setYear] = useState(
		date?.getFullYear() ?? new Date().getFullYear(),
	);
	const [month, setMonth] = useState(date?.getMonth() ?? new Date().getMonth());
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"secondary"}
					className={cn(
						"w-full justify-start text-left h-9",
						!date && "text-muted-foreground",
					)}
				>
					<Calendar03Icon className="w-4 h-4" strokeWidth={2} />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-1" align="start">
				<div className="flex items-center gap-2">
					<Select
						onValueChange={(value) => {
							setYear(Number.parseInt(value));
						}}
						value={year.toString()}
					>
						<SelectTrigger>
							<SelectValue placeholder="Year" />
						</SelectTrigger>
						<SelectContent>
							{YEARS.map((year) => (
								<SelectItem key={year} value={year.toString()}>
									{year}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select
						onValueChange={(value) => {
							setMonth(MONTHS.indexOf(value));
						}}
						value={MONTHS[month]}
					>
						<SelectTrigger>
							<SelectValue placeholder="Month" />
						</SelectTrigger>
						<SelectContent>
							{MONTHS.map((month) => (
								<SelectItem key={month} value={month}>
									{month}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
					month={new Date(Number(year), month)}
					hideNavigation
					toDate={toDate}
					fromDate={fromDate}
				/>
			</PopoverContent>
		</Popover>
	);
}
