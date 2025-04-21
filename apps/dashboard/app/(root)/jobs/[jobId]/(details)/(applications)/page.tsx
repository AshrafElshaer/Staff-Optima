"use client";
import { buttonVariants } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@optima/ui/components/tabs";
import Link from "next/link";
import { useState } from "react";
// Demo application data with stages that match your schema
const demoApplications = [
	{
		id: "1",
		candidateName: "John Smith",
		email: "john.smith@example.com",
		stage: {
			title: "Initial Screening",
			indicator_color: "#FFA500",
			stage_order: 1,
		},
		appliedDate: "2024-03-20",
		experience: "5 years",
		skills: ["React", "TypeScript", "Node.js"],
		status: "in_review",
	},
	{
		id: "2",
		candidateName: "Sarah Johnson",
		email: "sarah.j@example.com",
		stage: {
			title: "Technical Interview",
			indicator_color: "#4CAF50",
			stage_order: 2,
		},
		appliedDate: "2024-03-19",
		experience: "3 years",
		skills: ["Vue.js", "JavaScript", "Python"],
		status: "scheduled",
	},
	{
		id: "3",
		candidateName: "Michael Chen",
		email: "m.chen@example.com",
		stage: {
			title: "New Application",
			indicator_color: "#2196F3",
			stage_order: 0,
		},
		appliedDate: "2024-03-21",
		experience: "2 years",
		skills: ["Angular", "Java", "Spring"],
		status: "new",
	},
];

interface JobDetailsPageProps {
	params: Promise<{ jobId: string }>;
}

export default async function JobDetailsPage() {
	const [status, setStatus] = useState<string | undefined>(undefined);

	return (
		<div className="space-y-6">
			<div className="flex flex-wrap gap-2">
				<button
					className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
						!status ? "bg-primary text-primary-foreground" : "bg-secondary"
					}`}
					onClick={() => setStatus(undefined)}
					type="button"
				>
					All Applications ({demoApplications.length})
				</button>
				{["new", "in_review", "scheduled"].map((filterStatus) => (
					<button
						key={filterStatus}
						className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
							status === filterStatus
								? "bg-primary text-primary-foreground"
								: "bg-secondary"
						}`}
						onClick={() => setStatus(filterStatus)}
						type="button"
					>
						{filterStatus.charAt(0).toUpperCase() +
							filterStatus.slice(1).replace("_", " ")}{" "}
						(
						{
							demoApplications.filter((app) => app.status === filterStatus)
								.length
						}
						)
					</button>
				))}
			</div>

			<Card className="mt-6">
				<CardHeader>
					<CardTitle>
						{status
							? `${
									status.charAt(0).toUpperCase() +
									status.slice(1).replace("_", " ")
								} Applications`
							: "All Applications"}{" "}
						(
						{status
							? demoApplications.filter((app) => app.status === status).length
							: demoApplications.length}
						)
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b">
									<th className="text-left py-3 px-4 font-medium text-sm">
										Candidate
									</th>
									<th className="text-left py-3 px-4 font-medium text-sm">
										Stage
									</th>
									<th className="text-left py-3 px-4 font-medium text-sm">
										Applied Date
									</th>
									<th className="text-left py-3 px-4 font-medium text-sm">
										Skills
									</th>
									<th className="text-left py-3 px-4 font-medium text-sm">
										Experience
									</th>
								</tr>
							</thead>
							<tbody>
								{(status
									? demoApplications.filter((app) => app.status === status)
									: demoApplications
								).map((application) => (
									<tr
										key={application.id}
										className="border-b last:border-0 transition-colors"
									>
										<td className="py-3 px-4">
											<div className="flex flex-col">
												<span className="font-medium text-sm">
													{application.candidateName}
												</span>
												<span className="text-sm">{application.email}</span>
											</div>
										</td>
										<td className="py-3 px-4">
											<span
												className="px-2.5 py-1 rounded-full text-xs font-medium"
												style={{
													backgroundColor: `${application.stage.indicator_color}15`,
													color: application.stage.indicator_color,
												}}
											>
												{application.stage.title}
											</span>
										</td>
										<td className="py-3 px-4 text-sm">
											{application.appliedDate}
										</td>
										<td className="py-3 px-4">
											<div className="flex gap-1 flex-wrap">
												{application.skills.map((skill, index) => (
													<span
														key={index.toString()}
														className="px-2 py-0.5 rounded-full text-xs"
													>
														{skill}
													</span>
												))}
											</div>
										</td>
										<td className="py-3 px-4 text-sm">
											{application.experience}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
