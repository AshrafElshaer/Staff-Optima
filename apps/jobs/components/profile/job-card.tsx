import type { Department, JobPost } from "@optima/supabase/types";
import { Badge } from "@optima/ui/components/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import { Separator } from "@optima/ui/components/separator";
import { MoneyExchange02Icon, TaskDaily01Icon } from "hugeicons-react";
import { headers } from "next/headers";
import Link from "next/link";

export async function JobCard({
	jobPost,
}: { jobPost: JobPost & { department: Department } }) {
	const headersList = await headers();
	const pathname = headersList.get("x-pathname");
	const organizationDomain = pathname?.split("/")[1];

	return (
		<Link href={`/${organizationDomain}/${jobPost.id}`}>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="flex items-center justify-between gap-2 capitalize">
						<span>{jobPost.title}</span>
						<span>{jobPost.experience_level.replace("_", " ")}</span>
					</CardTitle>
					<CardDescription className="capitalize">
						{jobPost.department.name} • {jobPost.work_mode.replace("_", " ")} -{" "}
						{jobPost.employment_type.replace("_", " ")}
					</CardDescription>
				</CardHeader>
				<Separator />
				<CardContent className="flex flex-col gap-2 text-secondary-foreground">
					{jobPost.required_skills && jobPost.required_skills.length > 0 && (
						<div className="flex items-center gap-2">
							<TaskDaily01Icon className="size-4 min-w-fit" strokeWidth={2} />
							<div className="flex flex-wrap gap-2">
								{jobPost.required_skills.map((skill) => (
									<Badge key={skill} size="sm" variant="secondary">
										{skill}
									</Badge>
								))}
							</div>
						</div>
					)}
					{jobPost.salary_range && (
						<div className="flex items-center gap-2">
							<MoneyExchange02Icon className="size-4" strokeWidth={2} />
							<span>{jobPost.salary_range}</span>
						</div>
					)}
				</CardContent>
			</Card>
		</Link>
	);
}
