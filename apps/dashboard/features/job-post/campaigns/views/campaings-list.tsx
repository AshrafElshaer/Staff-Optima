"use client";
import type { JobPostCampaign } from "@optima/supabase/types";
import { Button } from "@optima/ui/components/button";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@optima/ui/components/table";

import { useUserPreferences } from "@/hooks/use-user-preferences";
import { Skeleton } from "@optima/ui/components/skeleton";
import { MoreHorizontal, Pause, Pencil, Trash } from "lucide-react";
import moment from "moment";
import { FaPause } from "react-icons/fa6";
import { CampaignStatus } from "../../views/list/campiagn-status";
type CampaignsListProps = {
	campaigns: JobPostCampaign[];
};

export function CampaignsList({ campaigns }: CampaignsListProps) {
	const { data: userPreferences } = useUserPreferences();

	if (campaigns.length === 0) {
		return (
			<div className="flex flex-col flex-1 items-center justify-center h-full w-full relative">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={60}
					height={60}
					viewBox="0 0 24 24"
					className="absolute top-0 sm:right-10 rotate-90 text-muted-foreground"
				>
					<title>arrow</title>
					<path
						fill="currentColor"
						d="M12 9.059V6.5a1.001 1.001 0 0 0-1.707-.708L4 12l6.293 6.207a.997.997 0 0 0 1.414 0A1 1 0 0 0 12 17.5v-2.489c2.75.068 5.755.566 8 3.989v-1c0-4.633-3.5-8.443-8-8.941"
					/>
				</svg>
				<p className=" text-muted-foreground">No campaigns found</p>
				<p className=" text-muted-foreground">
					Start by creating your first campaign
				</p>
			</div>
		);
	}
	return (
		<section className="w-full border rounded-md">
			<Table>
				<TableHeader>
					<TableRow className="bg-accent hover:bg-accent">
						<TableHead>Status</TableHead>
						<TableHead>Period</TableHead>
						<TableHead>Progress</TableHead>
						<TableHead>Integrated Apps</TableHead>
						<TableHead className="w-10"> </TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{campaigns.map((campaign) => (
						<TableRow key={campaign.id}>
							<TableCell className="capitalize">{campaign.status}</TableCell>
							<TableCell>
								{moment(campaign.start_date).format(
									userPreferences?.date_format ?? "MM/DD/YYYY",
								)}{" "}
								-{" "}
								{campaign.end_date
									? moment(campaign.end_date).format(
											userPreferences?.date_format ?? "MM/DD/YYYY",
										)
									: "Ongoing"}
							</TableCell>
							<TableCell>
								<CampaignStatus campaign={campaign} />
							</TableCell>
							<TableCell>
								{campaign.is_integration_enabled ? "Yes" : "No"}
							</TableCell>
							<TableCell>
								{campaign.status === "running" ? (
									<Button variant="ghost" size="icon">
										<FaPause className="h-4 w-4" />
									</Button>
								) : null}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
}

export function CampaignsListLoading() {
	return (
		<section className="w-full border rounded-md">
			<Table>
				<TableHeader>
					<TableRow className="bg-accent hover:bg-accent">
						<TableHead>Status</TableHead>
						<TableHead>Period</TableHead>
						<TableHead>Progress</TableHead>
						<TableHead>Integration</TableHead>
						<TableHead className="w-10"> </TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: 5 }).map((_, index) => (
						<TableRow key={index.toString()}>
							<TableCell>
								<Skeleton className="h-4 w-16" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-32" />
							</TableCell>
							<TableCell className="space-y-1">
								<Skeleton className="h-3 w-24" />
								<Skeleton className="h-3 w-full" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-12" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-6 w-6" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
}
