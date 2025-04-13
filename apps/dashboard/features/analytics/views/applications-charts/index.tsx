"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
	{ date: "2024-04-01", applications: 222 },
	{ date: "2024-04-02", applications: 97 },
	{ date: "2024-04-03", applications: 167 },
	{ date: "2024-04-04", applications: 242 },
	{ date: "2024-04-05", applications: 373 },
	{ date: "2024-04-06", applications: 301 },
	{ date: "2024-04-07", applications: 245 },
	{ date: "2024-04-08", applications: 409 },
	{ date: "2024-04-09", applications: 59 },
	{ date: "2024-04-10", applications: 261 },
	{ date: "2024-04-11", applications: 327 },
	{ date: "2024-04-12", applications: 292 },
	{ date: "2024-04-13", applications: 342 },
	{ date: "2024-04-14", applications: 137 },
	{ date: "2024-04-15", applications: 120 },
	{ date: "2024-04-16", applications: 138 },
	{ date: "2024-04-17", applications: 446 },
	{ date: "2024-04-18", applications: 364 },
	{ date: "2024-04-19", applications: 243 },
	{ date: "2024-04-20", applications: 89 },
	{ date: "2024-04-21", applications: 137 },
	{ date: "2024-04-22", applications: 224 },
	{ date: "2024-04-23", applications: 138 },
	{ date: "2024-04-24", applications: 387 },
	{ date: "2024-04-25", applications: 215 },
	{ date: "2024-04-26", applications: 75 },
	{ date: "2024-04-27", applications: 383 },
	{ date: "2024-04-28", applications: 122 },
	{ date: "2024-04-29", applications: 315 },
	{ date: "2024-04-30", applications: 454 },
	{ date: "2024-05-01", applications: 165 },
	{ date: "2024-05-02", applications: 293 },
	{ date: "2024-05-03", applications: 247 },
	{ date: "2024-05-04", applications: 385 },
	{ date: "2024-05-05", applications: 481 },
	{ date: "2024-05-06", applications: 498 },
	{ date: "2024-05-07", applications: 388 },
	{ date: "2024-05-08", applications: 149 },
	{ date: "2024-05-09", applications: 227 },
	{ date: "2024-05-10", applications: 293 },
	{ date: "2024-05-11", applications: 335 },
	{ date: "2024-05-12", applications: 197 },
	{ date: "2024-05-13", applications: 197 },
	{ date: "2024-05-14", applications: 448 },
	{ date: "2024-05-15", applications: 473 },
	{ date: "2024-05-16", applications: 338 },
	{ date: "2024-05-17", applications: 499 },
	{ date: "2024-05-18", applications: 315 },
	{ date: "2024-05-19", applications: 235 },
	{ date: "2024-05-20", applications: 177 },
	{ date: "2024-05-21", applications: 82 },
	{ date: "2024-05-22", applications: 81 },
	{ date: "2024-05-23", applications: 252 },
	{ date: "2024-05-24", applications: 294 },
	{ date: "2024-05-25", applications: 201 },
	{ date: "2024-05-26", applications: 213 },
	{ date: "2024-05-27", applications: 420 },
	{ date: "2024-05-28", applications: 233 },
	{ date: "2024-05-29", applications: 78 },
	{ date: "2024-05-30", applications: 340 },
	{ date: "2024-05-31", applications: 178 },
	{ date: "2024-06-01", applications: 178 },
	{ date: "2024-06-02", applications: 470 },
	{ date: "2024-06-03", applications: 103 },
	{ date: "2024-06-04", applications: 439 },
	{ date: "2024-06-05", applications: 88 },
	{ date: "2024-06-06", applications: 294 },
	{ date: "2024-06-07", applications: 323 },
	{ date: "2024-06-08", applications: 385 },
	{ date: "2024-06-09", applications: 438 },
	{ date: "2024-06-10", applications: 155 },
	{ date: "2024-06-11", applications: 92 },
	{ date: "2024-06-12", applications: 492 },
	{ date: "2024-06-13", applications: 81 },
	{ date: "2024-06-14", applications: 426 },
	{ date: "2024-06-15", applications: 307 },
	{ date: "2024-06-16", applications: 371 },
	{ date: "2024-06-17", applications: 475 },
	{ date: "2024-06-18", applications: 107 },
	{ date: "2024-06-19", applications: 341 },
	{ date: "2024-06-20", applications: 408 },
	{ date: "2024-06-21", applications: 169 },
	{ date: "2024-06-22", applications: 317 },
	{ date: "2024-06-23", applications: 480 },
	{ date: "2024-06-24", applications: 132 },
	{ date: "2024-06-25", applications: 141 },
	{ date: "2024-06-26", applications: 434 },
	{ date: "2024-06-27", applications: 448 },
	{ date: "2024-06-28", applications: 149 },
	{ date: "2024-06-29", applications: 103 },
	{ date: "2024-06-30", applications: 446 },
];

const chartConfig = {
	views: {
		label: "Applications",
	},
	applications: {
		label: "Applications",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;

export function ApplicationsCharts() {
	const total = React.useMemo(
		() => ({
			applications: chartData.reduce(
				(acc, curr) => acc + (curr.applications || 0),
				0,
			),
		}),
		[],
	);

	return (
		<Card>
			<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 p-4 ">
					<CardTitle>Applications Trends</CardTitle>
					<CardDescription>
						Showing total applications for the last 3 months
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:p-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[150px]"
									nameKey="views"
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										});
									}}
								/>
							}
						/>
						<Bar dataKey="applications" fill="var(--chart-1)" />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
