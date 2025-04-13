"use client";

import { TrendingUp } from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@optima/ui/components/chart";

const chartData = [
	{ source: "LinkedIn", value: 266 },
	{ source: "Indeed", value: 505 },
	{ source: "Glassdoor", value: 357 },
	{ source: "Dice", value: 263 },
	{ source: "Website", value: 339 },
];

const chartConfig = {
	value: {
		label: "Applications",
		color: "var(--chart-1)",
	},
	label: {
		color: "var(--background)",
	},
} satisfies ChartConfig;

export function ApplicationsSources() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Application Sources</CardTitle>
				<CardDescription>Total applications by source</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={chartData} layout="vertical">
						{/* <CartesianGrid horizontal strokeDasharray="3 3" /> */}
						<YAxis
							dataKey="source"
							type="category"
							tickLine={false}
							axisLine={false}
							width={0}
						/>
						<XAxis type="number" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Bar
							dataKey="value"
							fill="var(--color-value)"
							radius={4}
							//   barSize={24}
						>
							<LabelList
								dataKey="source"
								position="insideLeft"
								// offset={8}
								className="fill-[#fff]"
								fontSize={14}
							/>
							<LabelList
								dataKey="value"
								position="right"
								offset={8}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
