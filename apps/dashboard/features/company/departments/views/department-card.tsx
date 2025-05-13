"use client";
import type { DepartmentWithJobPostsAndApplications } from "@/app/(root)/company/departments/page";
import type { Application, Department, JobPost } from "@optima/supabase/types";
import {
	cardClasses,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@optima/ui/components/tooltip";
import { cn } from "@optima/ui/lib/utils";
import { JobLinkIcon } from "hugeicons-react";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function DepartmentCard({
	department,
}: {
	department: DepartmentWithJobPostsAndApplications;
}) {
	const router = useRouter();
	function handleNavigate(e: React.MouseEvent<HTMLDivElement>) {
		console.log(e.target);
		if (e.target instanceof HTMLAnchorElement) {
			e.preventDefault();
			return;
		}
		router.push(`/company/departments/${department.id}`);
	}
	return (
		<Card
			key={department.id}
			className="bg-accent group h-fit"
			// onClick={handleNavigate}
		>
			<div className="flex items-center  gap-4 px-4">
				<p className="text-lg font-semibold mr-auto">{department.name}</p>
				{/* 
          <DepartmentDialog department={department}>
            <button
              type="button"
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-secondary-foreground hover:text-foreground "
            >
              <PencilEdit01Icon size={18} strokeWidth={2} />
            </button>
          </DepartmentDialog>
          <DeleteDepartment department={department} /> */}
			</div>
			<div className="flex items-center justify-between gap-2 px-4">
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href={`/jobs?department=${department.id}`}
								className="flex items-center gap-2"
							>
								<JobLinkIcon size={18} strokeWidth={2} />
								{department.job_posts.length ?? 0}
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p>Job Posts</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger className="flex items-center gap-2" asChild>
							<Link
								href={`/candidates?department=${department.id}`}
								className="flex items-center gap-2"
							>
								<UserIcon size={18} strokeWidth={2} />
								{department.applications.length ?? 0}
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p>Applications</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</Card>
	);
}
