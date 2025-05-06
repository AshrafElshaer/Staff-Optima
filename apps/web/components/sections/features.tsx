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
import { SectionHeader } from "../section-header";

const features = [
	{
		title: "Custom Workflows",
		description:
			"Design and implement customizable hiring workflows that perfectly match your organization's unique recruitment process. Create multi-stage pipelines, set automated actions, and ensure consistency across all hiring channels. Streamline your recruitment with drag-and-drop workflow builders, conditional logic rules, and automated stage transitions. Define custom fields, evaluation criteria, and approval workflows tailored to different departments and roles.",
	},
	// {
	// 	title: "AI-Powered Candidate Matching",
	// 	description:
	// 		"Leverage advanced machine learning algorithms to automatically match candidates with open positions based on skills, experience, and cultural fit. Reduce screening time and improve quality of hire with intelligent candidate recommendations and predictive analytics.",
	// },
	{
		title: "Advanced Analytics",
		description:
			"Get actionable insights with real-time analytics dashboards. Track key metrics like time-to-hire and cost-per-hire to optimize your recruitment funnel and make data-driven decisions.",
	},

	{
		title: "Collaborative Hiring",
		description:
			"Foster seamless teamwork with shared candidate profiles, structured interview feedback forms, and collaborative decision-making tools. Keep all stakeholders aligned and make better hiring decisions together.",
	},
	{
		title: "Candidate Relationship Management",
		description:
			"Build lasting relationships with candidates through our CRM tools. Track interactions, set reminders, and maintain candidate profiles. Segment your talent pool and create targeted engagement campaigns to improve candidate experience.",
	},

	{
		title: "Multi-Channel Job Posting",
		description:
			"Launch and manage comprehensive job campaigns across multiple platforms simultaneously. Post openings to LinkedIn, Indeed, and other major job boards with a single click. Track applications, engagement metrics, and candidate sources in real-time. Optimize your job postings with performance analytics and automated cross-platform distribution to maximize visibility and attract top talent.",
	},
	{
		title: "Schedule Interviews",
		description:
			"Let candidates self-schedule interviews by selecting from your available time slots. Eliminate back-and-forth emails with automated scheduling that syncs directly with your calendar.",
	},
];

export function Features() {
	return (
		<section id="features" className="border-t">
			<SectionHeader>Everything you need</SectionHeader>
			<div className="max-w-5xl mx-auto border-x ">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
					{features.map((feature, idx) => (
						<Feature key={feature.title} index={idx} {...feature} />
					))}
				</div>
			</div>
		</section>
	);
}
