"use client";

import { continents } from "@optima/location";
import { Button } from "@optima/ui/components/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@optima/ui/components/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@optima/ui/components/popover";
import { cn } from "@optima/ui/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { Fragment, useState } from "react";

type Props = {
	value: string | null;
	setValue: (value: string) => void;
	triggerClassName?: string;
};
export function CountrySelector({ setValue, value, triggerClassName }: Props) {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					id="select-44"
					variant="secondary"
					aria-expanded={open}
					className={cn(
						"w-full justify-between  px-3 font-normal outline-offset-0  focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20",
						triggerClassName,
					)}
				>
					{value ? (
						<span className="flex min-w-0 items-center gap-2">
							<span className="text-lg leading-none">
								{
									continents
										.map((group) =>
											group.countries.find((item) => item.name === value),
										)
										.filter(Boolean)[0]?.flag
								}
							</span>
							<span className="truncate">{value}</span>
						</span>
					) : (
						<span className="text-muted-foreground">Select country</span>
					)}
					<ChevronDown
						size={16}
						strokeWidth={2}
						className="shrink-0 text-muted-foreground/80"
						aria-hidden="true"
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-full min-w-[var(--radix-popper-anchor-width)] border p-0"
				align="start"
			>
				<Command>
					<CommandInput placeholder="Search country..." />
					<CommandList>
						<CommandEmpty>No country found.</CommandEmpty>
						{continents.map((group) => (
							<Fragment key={group.continent}>
								<CommandGroup heading={group.continent}>
									{group.countries.map((country) => (
										<CommandItem
											key={country.cca2}
											value={country.name}
											onSelect={(currentValue) => {
												setValue(currentValue);
												setOpen(false);
											}}
										>
											<span className="text-lg leading-none">
												{country.flag}
											</span>{" "}
											{country.name}
											{value === country.name && (
												<Check size={16} strokeWidth={2} className="ml-auto" />
											)}
										</CommandItem>
									))}
								</CommandGroup>
							</Fragment>
						))}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
