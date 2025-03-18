import type { Department } from "@optima/database/types";
import {
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
import { JobLinkIcon } from "hugeicons-react";
import { UserIcon } from "lucide-react";
import Link from "next/link";

export function DepartmentCard({ department }: { department: Department }) {
	return (
		<Card key={department.id} className="p-4  bg-accent group h-fit">
			<div className="flex items-center  gap-4">
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
			<div className="flex items-center justify-between gap-2">
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href={`/job-posts?department=${department.id}`}
								className="flex items-center gap-2"
							>
								<JobLinkIcon size={18} strokeWidth={2} />
								<p className=" ">0</p>
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
								<p className=" ">0</p>
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
