"use client";
import { SearchIcon } from "lucide-react";

import { Badge } from "@optima/ui/components/badge";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@optima/ui/components/dropdown-menu";

import {
	employmentTypeEnum,
	experienceLevelEnum,
	jobPostCampaignStatusEnum,
	jobPostStatusEnum,
	workModeEnum,
} from "@optima/supabase/types";

import { BriefcaseIcon, X } from "lucide-react";

import { PermissionGuard } from "@/features/auth/views/permission-gaurd";
import { useSupabase } from "@/hooks/use-supabase";
import { getDepartmentsByCompanyId } from "@optima/supabase/queries";
import { Button, buttonVariants } from "@optima/ui/components/button";
import { Icons } from "@optima/ui/components/icons";
import { Input } from "@optima/ui/components/inputs";
import { Separator } from "@optima/ui/components/separator";
import { useQuery } from "@tanstack/react-query";
import { FilterAddIcon, GridViewIcon, Location01Icon } from "hugeicons-react";
import Link from "next/link";
import { useQueryStates } from "nuqs";
import { useMemo, useState } from "react";
import { IoTimerOutline } from "react-icons/io5";
import { MdSignalWifiStatusbarConnectedNoInternet1 } from "react-icons/md";
import { jobPostsSearchParams } from "../../job-posts.search-params";

const filters = [
	{
		label: "Job Status",
		options: Object.values(jobPostStatusEnum).map((status) => ({
			label: status,
			value: status,
		})),
		icon: <MdSignalWifiStatusbarConnectedNoInternet1 className="size-4" />,
	},
	{
		label: "Campaign Status",
		options: Object.values(jobPostCampaignStatusEnum).map((status) => ({
			label: status,
			value: status,
		})),
		icon: <Icons.Megaphone className="size-4" />,
	},
	{
		label: "Type",
		options: Object.values(employmentTypeEnum).map((type) => ({
			label: type,
			value: type,
		})),
		icon: <IoTimerOutline className="size-4" />,
	},
	{
		label: "Work Mode",
		options: Object.values(workModeEnum).map((location) => ({
			label: location,
			value: location,
		})),
		icon: <Location01Icon className="size-4" />,
	},
	{
		label: "Experience",
		options: Object.values(experienceLevelEnum).map((experience) => ({
			label: experience,
			value: experience,
		})),
		icon: <BriefcaseIcon className="size-4" />,
	},
];

export function JobPostHeader() {
	const [selectedFilters, setSelectedFilters] = useQueryStates(
		jobPostsSearchParams,
		{
			shallow: false,
		},
	);

	const supabase = useSupabase();

	const { data: departments, error } = useQuery({
		queryKey: ["departments"],
		queryFn: async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) throw new Error("User not found");
			const { data: departments, error } = await getDepartmentsByCompanyId(
				supabase,
				user.user_metadata.company_id,
			);
			if (error) throw error;
			return departments;
		},
	});

	const adjustedFilters = useMemo(() => {
		return [
			{
				label: "Department",
				options:
					departments?.map((department) => ({
						label: department.name,
						value: department.id,
					})) || [],
				icon: <GridViewIcon className="size-4" />,
			},
			...filters,
		];
	}, [departments]);

	const handleAddFilter = (label: string, value: string) => {
		const target = label
			.toLowerCase()
			.replace(" ", "_") as keyof typeof selectedFilters;
		setSelectedFilters((prev) => ({
			...prev,
			[target]: [...(prev[target] || []), value],
		}));
	};

	const handleRemoveFilter = (label: string, value: string) => {
		const target = label
			.toLowerCase()
			.replace(" ", "_") as keyof typeof selectedFilters;
		setSelectedFilters((prev) => ({
			...prev,
			[target]: Array.isArray(prev[target])
				? prev[target].filter((v: string) => v !== value)
				: [],
		}));
	};

	const handleClearFilters = () => {
		setSelectedFilters({
			department: [],
			job_status: [],
			campaign_status: [],
			type: [],
			work_mode: [],
			experience: [],
			title: "",
		});
	};

	const handleRemoveLabel = (label: string) => {
		setSelectedFilters((prev) => ({
			...prev,
			[label.toLowerCase().replace(" ", "_")]: [],
		}));
	};

	return (
		<section className="flex flex-col sm:flex-row items-center gap-4 w-full">
			<div className="flex items-center gap-2 overflow-x-scroll w-full scrollbar-hide">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="min-w-fit py-2">
							<FilterAddIcon className="size-4" /> Add Filter
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						{adjustedFilters.map((filter) => (
							<DropdownMenuSub key={filter.label}>
								<DropdownMenuSubTrigger className="flex items-center gap-2">
									{filter.icon}
									{filter.label}
								</DropdownMenuSubTrigger>
								<DropdownMenuSubContent sideOffset={8} className="w-36">
									{filter.options.map((option) => (
										<DropdownMenuCheckboxItem
											checked={Boolean(
												(
													selectedFilters[
														filter.label
															.toLowerCase()
															.replace(" ", "_") as keyof typeof selectedFilters
													] as string[]
												)?.includes(option.value),
											)}
											onCheckedChange={(checked) => {
												if (checked) {
													handleAddFilter(
														filter.label.toLowerCase(),
														option.value,
													);
												} else {
													handleRemoveFilter(
														filter.label.toLowerCase(),
														option.value,
													);
												}
											}}
											onSelect={(e) => {
												e.preventDefault();
											}}
											key={option.value}
											className="capitalize"
										>
											{option.label.split("_").join(" ")}
										</DropdownMenuCheckboxItem>
									))}
								</DropdownMenuSubContent>
							</DropdownMenuSub>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				{Object.keys(selectedFilters).length > 0 && (
					<>
						<div className="flex items-center gap-2  min-w-fit">
							{Object.entries(selectedFilters).map(
								([key, values]) =>
									key !== "title" &&
									values.length > 0 && (
										<div
											key={key}
											className="flex items-center gap-2 text-sm bg-accent px-3 py-2 rounded-md font-medium border min-w-fit"
										>
											<p className="text-muted-foreground capitalize">
												{key.split("_").join(" ")}
											</p>
											<Separator orientation="vertical" className="h-4" />
											<div className="flex items-center gap-2 min-w-fit">
												{Array.isArray(values) && (
													<div className="flex items-center gap-1">
														{values
															.slice(0, 2)
															.map((value: string, index: number) => (
																<p key={value} className="capitalize min-w-fit">
																	{key === "department"
																		? (departments?.find((d) => d.id === value)
																				?.name ?? value)
																		: value.split("_").join(" ")}
																	{index < Math.min(values.length, 2) - 1 &&
																		","}
																</p>
															))}
														{values.length > 2 && (
															<span className="rounded-sm bg-primary text-primary-foreground px-1.5  text-xs">
																+{values.length - 2}
															</span>
														)}
													</div>
												)}
											</div>
											<Separator orientation="vertical" className="h-4" />
											<button
												type="button"
												onClick={() => handleRemoveLabel(key)}
											>
												<X className="size-4" />
											</button>
										</div>
									),
							)}
						</div>
						{Object.entries(selectedFilters).some(
							([key, values]) => key !== "title" && values.length > 0,
						) && (
							<Button
								variant="outline"
								onClick={handleClearFilters}
								className="min-w-fit"
							>
								Clear all
							</Button>
						)}
					</>
				)}
			</div>

			<div className="w-full sm:w-fit ml-auto">
				<Input
					placeholder="Search by title"
					startIcon={<SearchIcon className="size-4" />}
					value={selectedFilters.title}
					onChange={(e) => {
						setSelectedFilters((prev) => ({
							...prev,
							title: e.target.value,
						}));
					}}
				/>
			</div>
			<PermissionGuard requiredPermissions={["job:create"]}>
				<Link
					href="/jobs/create"
					className={buttonVariants({
						variant: "secondary",
						className: "ml-auto",
					})}
				>
					Create Job
				</Link>
			</PermissionGuard>
		</section>
	);
}
