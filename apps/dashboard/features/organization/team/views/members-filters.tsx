"use client";
import { SearchIcon } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@optima/ui/components/dropdown-menu";

import { BriefcaseIcon, X } from "lucide-react";

import { useSupabase } from "@/hooks/use-supabase";
import { getOrganizationRoles } from "@optima/supabase/queries";
import { Button } from "@optima/ui/components/button";
import { Input } from "@optima/ui/components/inputs";
import { Separator } from "@optima/ui/components/separator";
import { useQuery } from "@tanstack/react-query";
import {
	FilterAddIcon,
	FingerPrintIcon,
	GridViewIcon,
	Location01Icon,
} from "hugeicons-react";
import { useQueryStates } from "nuqs";
import { useMemo, useState } from "react";
import { teamSearchParamsParser } from "../team.search-params";

export function MembersFilters() {
	const [selectedFilters, setSelectedFilters] = useQueryStates(
		teamSearchParamsParser,
		{
			shallow: false,
		},
	);

	const supabase = useSupabase();

	const { data: roles } = useQuery({
		queryKey: ["roles"],
		queryFn: async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) throw new Error("User not found");
			const { data: roles, error } = await getOrganizationRoles(
				supabase,
				user.user_metadata.organization_id,
			);
			if (error) throw error;
			return roles;
		},
	});

	const adjustedFilters = useMemo(() => {
		return [
			{
				label: "Role",
				options:
					roles?.map((role) => ({
						label: role.name,
						value: role.id,
					})) || [],
				icon: <FingerPrintIcon className="size-4" />,
			},
		];
	}, [roles]);

	const handleAddFilter = (label: string, value: string) => {
		const target = label.toLowerCase() as keyof typeof selectedFilters;
		setSelectedFilters((prev) => ({
			...prev,
			[target]: [...(prev[target] || []), value],
		}));
	};

	const handleRemoveFilter = (label: string, value: string) => {
		const target = label.toLowerCase() as keyof typeof selectedFilters;

		setSelectedFilters((prev) => ({
			...prev,
			[target]: Array.isArray(prev[target])
				? prev[target].filter((v: string) => v !== value).length > 0
					? prev[target].filter((v: string) => v !== value)
					: null
				: null,
		}));
	};

	const handleClearFilters = () => {
		setSelectedFilters(null);
	};

	const handleRemoveLabel = (label: string) => {
		setSelectedFilters((prev) => ({
			...prev,
			[label.toLowerCase()]: null,
		}));
	};

	return (
		<section className="flex flex-col sm:flex-row items-center gap-2 w-full">
			<div className="w-full sm:w-auto ml-auto">
				<Input
					placeholder="Search by name"
					startIcon={<SearchIcon className="size-5" />}
					value={selectedFilters.name}
					onChange={(e) => {
						setSelectedFilters((prev) => ({
							...prev,
							name: e.target.value,
						}));
					}}
				/>
			</div>
			<div className="flex items-center gap-2 overflow-x-scroll w-full scrollbar-hide">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="min-w-fit py-2">
							<FilterAddIcon className="size-4" strokeWidth={2} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						{adjustedFilters.map((filter) => (
							<DropdownMenuSub key={filter.label}>
								<DropdownMenuSubTrigger className="flex items-center gap-2">
									{filter.icon}
									{filter.label}
								</DropdownMenuSubTrigger>
								<DropdownMenuSubContent sideOffset={8} className="w-48">
									{filter.options.map((option) => (
										<DropdownMenuCheckboxItem
											checked={Boolean(
												(
													selectedFilters[
														filter.label.toLowerCase() as keyof typeof selectedFilters
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
							{Object.entries(selectedFilters).map(([key, values]) =>
								key !== "name" && values?.length && values.length > 0 ? (
									<div
										key={key}
										className="flex items-stretch gap-2 text-sm bg-accent px-3 py-2 rounded-md font-medium border min-w-fit"
									>
										<p className="text-secondary-foreground capitalize">
											{key}
										</p>
										<Separator orientation="vertical" className="h-4" />
										<div className="flex items-center gap-2 min-w-fit">
											{Array.isArray(values) &&
												values.map((value: string) => (
													<p key={value} className="capitalize min-w-fit">
														{key === "role"
															? (roles?.find((r) => r.id === value)?.name ??
																value)
															: value.split("_").join(" ")}
														,
													</p>
												))}
										</div>
										<Separator orientation="vertical" />
										<button
											type="button"
											onClick={() => handleRemoveLabel(key)}
											className="cursor-pointer"
										>
											<X className="size-4" />
										</button>
									</div>
								) : null,
							)}
						</div>
						{Object.entries(selectedFilters).some(
							([key, values]) =>
								key !== "name" && values?.length && values.length > 0,
						) ? (
							<Button
								variant="outline"
								onClick={handleClearFilters}
								className="min-w-fit"
							>
								Clear all
							</Button>
						) : null}
					</>
				)}
			</div>
		</section>
	);
}
