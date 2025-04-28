"use client";

import { filterSearchParamsParser } from "@/lib/filters.search-params";
import { createBrowserClient } from "@/lib/supabase/browser";
import { getDepartmentsByCompanyId } from "@optima/supabase/queries";
import {
	type EmploymentType,
	type ExperienceLevel,
	type WorkMode,
	employmentTypeEnum,
	experienceLevelEnum,
	workModeEnum,
} from "@optima/supabase/types";
import { Button } from "@optima/ui/components/button";
import { Label } from "@optima/ui/components/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@optima/ui/components/select";
import { Skeleton } from "@optima/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";

export function PositionsFilters({
	companyId,
}: {
	companyId: string;
}) {
	const [filters, setFilters] = useQueryStates(filterSearchParamsParser, {
		shallow: false,
	});
	const supabase = createBrowserClient();

	const { data: departments, isLoading } = useQuery({
		queryKey: ["departments"],
		queryFn: async () => {
			const { data, error } = await getDepartmentsByCompanyId(
				supabase,
				companyId,
			);
			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
	});
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div className="space-y-3">
				<Label>Department</Label>
				<Select
					value={filters.department[0]}
					onValueChange={(value) =>
						setFilters({ ...filters, department: [value] })
					}
				>
					<SelectTrigger className="capitalize w-full">
						<SelectValue placeholder="Select a department" />
					</SelectTrigger>
					<SelectContent>
						{isLoading ? (
							<div className="space-y-2">
								{[1, 2, 3].map((item) => (
									<Skeleton key={item} className="h-4 w-full" />
								))}
							</div>
						) : (
							departments?.map((department) => (
								<SelectItem key={department.id} value={department.id}>
									{department.name}
								</SelectItem>
							))
						)}
					</SelectContent>
				</Select>
			</div>
			<div className="space-y-3">
				<Label>Work Mode</Label>
				<Select
					value={filters.work_mode[0]}
					onValueChange={(value) =>
						setFilters({ ...filters, work_mode: [value as WorkMode] })
					}
				>
					<SelectTrigger className="capitalize w-full">
						<SelectValue placeholder="Select a location" />
					</SelectTrigger>
					<SelectContent>
						{Object.values(workModeEnum).map((workMode) => (
							<SelectItem
								key={workMode}
								value={workMode}
								className="capitalize"
							>
								{workMode.replace("_", " ")}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="space-y-3">
				<Label>Experience Level</Label>
				<Select
					value={filters.experience[0]}
					onValueChange={(value) =>
						setFilters({ ...filters, experience: [value as ExperienceLevel] })
					}
				>
					<SelectTrigger className="capitalize w-full">
						<SelectValue placeholder="Select an experience level" />
					</SelectTrigger>
					<SelectContent>
						{Object.values(experienceLevelEnum).map((level) => (
							<SelectItem key={level} value={level} className="capitalize">
								{level.replace("_", " ")}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="space-y-3">
				<Label>Employment Type</Label>
				<Select
					value={filters.type[0]}
					onValueChange={(value) =>
						setFilters({ ...filters, type: [value as EmploymentType] })
					}
				>
					<SelectTrigger className="capitalize w-full">
						<SelectValue placeholder="Select an employment type" />
					</SelectTrigger>
					<SelectContent>
						{Object.values(employmentTypeEnum).map((type) => (
							<SelectItem key={type} value={type} className="capitalize">
								{type.replace("_", " ")}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			{Object.values(filters).some((filter) => filter.length > 0) && (
				<Button
					variant="secondary"
					className="w-full md:col-span-2"
					onClick={() =>
						setFilters({
							department: [],
							work_mode: [],
							experience: [],
							type: [],
						})
					}
				>
					Reset Filters
				</Button>
			)}
		</div>
	);
}
