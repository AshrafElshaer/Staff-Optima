import {
	ChartIcon,
	ChartLineData01Icon,
	MailAdd02Icon,
	NeuralNetworkIcon,
	UserMultipleIcon,
	WorkflowSquare10Icon,
} from "hugeicons-react";
import { ChartColumn } from "lucide-react";
import type React from "react";
import { Feature } from "../feature";

const features = [
	{
		title: "Custom Workflows",
		description:
			"Design and implement customizable hiring workflows that perfectly match your organization's unique recruitment process. Create multi-stage pipelines, set automated actions, and ensure consistency across all hiring channels.",
		icon: (
			<WorkflowSquare10Icon
				strokeWidth={2}
				className="size-6 sm:size-7 md:size-8 "
			/>
		),
	},
	{
		title: "Automated Email Sequences",
		description:
			"Send personalized, automated email sequences to candidates based on their stage in the hiring process. Schedule follow-ups, send reminders, and maintain consistent communication without manual intervention.",
		icon: (
			<MailAdd02Icon strokeWidth={2} className="size-6 sm:size-7 md:size-8 " />
		),
	},
	{
		title: "Collaborative Hiring",
		description:
			"Foster seamless teamwork with shared candidate profiles, structured interview feedback forms, and collaborative decision-making tools. Keep all stakeholders aligned and make better hiring decisions together.",
		icon: (
			<UserMultipleIcon
				strokeWidth={2}
				className="size-6 sm:size-7 md:size-8 "
			/>
		),
	},
	{
		title: "Advanced Analytics",
		description:
			"Gain deep insights into your hiring process with customizable dashboards and real-time reporting. Track key metrics, identify bottlenecks, and optimize your recruitment funnel with data-driven decisions.",
		icon: (
			<ChartColumn strokeWidth={2} className="size-6 sm:size-7 md:size-8 " />
		),
	},
	{
		title: "Multi-Channel Job Posting",
		description:
			"Launch and manage job campaigns across multiple platforms simultaneously. Post openings to LinkedIn, Indeed, and other major job boards with a single click, while tracking applications and engagement from each source.",
		icon: (
			<NeuralNetworkIcon
				strokeWidth={2}
				className="size-6 sm:size-7 md:size-8"
			/>
		),
	},
];

export function Features() {
	return (
		<section className="max-w-4xl mx-auto space-y-24" id="features">
			<h2 className="text-4xl sm:text-5xl md:text-6xl  text-center font-bold">
				Everything you need
			</h2>
			<div className="space-y-10">
				{features.map((feature) => (
					<Feature
						key={feature.title}
						title={feature.title}
						description={feature.description}
						icon={feature.icon}
					/>
				))}
			</div>
		</section>
	);
}
