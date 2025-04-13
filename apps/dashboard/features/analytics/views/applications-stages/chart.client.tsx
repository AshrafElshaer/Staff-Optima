"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

// import type { ApplicationStage } from "@optima/supabase/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@optima/ui/components/chart";
const chartData = [
	{ stage: "Applied", applications: 275, fill: "var(--color-chrome)" },
	{ stage: "Screening", applications: 200, fill: "var(--color-safari)" },
	{ stage: "Interview", applications: 187, fill: "var(--color-firefox)" },
	{ stage: "Offer", applications: 173, fill: "var(--color-edge)" },
	{ stage: "Hired", applications: 90, fill: "var(--color-other)" },
];

const chartConfig = {
	visitors: {
		label: "Applications",
	},
	chrome: {
		label: "Chrome",
		color: "var(--chart-1)",
	},
	safari: {
		label: "Safari",
		color: "var(--chart-2)",
	},
	firefox: {
		label: "Firefox",
		color: "var(--chart-3)",
	},
	edge: {
		label: "Edge",
		color: "var(--chart-4)",
	},
	other: {
		label: "Other",
		color: "var(--chart-5)",
	},
} satisfies ChartConfig;

type ApplicationStage = {
	title: string;
	indicator_color: string;
};

export function ApplicationsStagesChartClient({
	stages,
}: { stages: ApplicationStage[] }) {
	const chartData = stages.map((stage) => ({
		stage: stage.title,
		applications: Math.floor(Math.random() * 500),
		fill: stage.indicator_color,
	}));
	const chartConfig = {
		visitors: {
			label: "Applications",
		},
		...Object.fromEntries(
			stages.map((stage) => [
				stage.title,
				{
					label: stage.title,
					color: stage.indicator_color,
				},
			]),
		),
	} satisfies ChartConfig;
	return (
		<Card className="flex flex-col pb-8">
			<CardHeader className="items-start pb-0">
				<CardTitle>Applications Stages</CardTitle>
				<CardDescription>Total applications by stage</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0 ">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart margin={{ top: 16, right: 0, bottom: 0, left: 0 }}>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="applications"
							nameKey="stage"
							innerRadius={40}
							label={({ payload, ...props }) => {
								return (
									<text
										cx={props.cx}
										cy={props.cy}
										x={props.x}
										y={props.y}
										textAnchor={props.textAnchor}
										dominantBaseline={props.dominantBaseline}
										fill="hsla(var(--foreground))"
									>
										{payload.applications}
									</text>
								);
							}}
						/>
						<ChartLegend
							content={<ChartLegendContent nameKey="stage" />}
							className="translate-y-6 flex-wrap gap-2  [&>*]:justify-center"
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
