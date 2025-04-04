import { useId } from "react";
import { Checkbox } from "../checkbox";

type DaysSelectorProps = {
	value: string[];
	onChange: (value: string[]) => void;
};

export function DaysSelector({ value, onChange }: DaysSelectorProps) {
	const id = useId();

	const items = [
		{ value: "1", label: "Monday" },
		{ value: "2", label: "Tuesday" },
		{ value: "3", label: "Wednesday" },
		{ value: "4", label: "Thursday" },
		{ value: "5", label: "Friday" },
		{ value: "6", label: "Saturday" },
		{ value: "7", label: "Sunday" },
	];

	return (
		<fieldset className="space-y-4">
			<legend className="text-foreground text-sm leading-none font-medium">
				Days of the week
			</legend>
			<div className="flex gap-2 flex-wrap">
				{items.map((item) => {
					const isChecked = value.includes(item.value);
					return (
						// biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
						<label
							key={`${id}-${item.value}`}
							data-state={isChecked ? "checked" : "unchecked"}
							className="border-input hover:bg-accent hover:text-accent-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 relative flex size-9 cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border text-center shadow-xs transition-colors outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
						>
							<Checkbox
								id={`${id}-${item.value}`}
								value={item.value}
								checked={isChecked}
								onCheckedChange={(checked) => {
									if (checked) {
										onChange([...value, item.value]);
									} else {
										onChange(value.filter((v) => v !== item.value));
									}
								}}
								className="sr-only after:absolute after:inset-0"
							/>
							<span aria-hidden="true" className="text-sm font-medium">
								{item.label.slice(0, 3)}
							</span>
							<span className="sr-only">{item.label}</span>
						</label>
					);
				})}
			</div>
		</fieldset>
	);
}
