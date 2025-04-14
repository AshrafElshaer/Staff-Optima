"use client";

import type { User } from "@optima/supabase/types";
import { Avatar } from "@optima/ui/components/avatar";
import { Badge } from "@optima/ui/components/badge";
import { Button } from "@optima/ui/components/button";
import { Checkbox } from "@optima/ui/components/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@optima/ui/components/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@optima/ui/components/tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import {
	CancelCircleHalfDotIcon,
	CheckmarkSquare03Icon,
	Delete03Icon,
	Edit01Icon,
	FileDownloadIcon,
	ViewIcon,
} from "hugeicons-react";
import { Loader, MoreHorizontal, X } from "lucide-react";
import moment from "moment";

export const columns: ColumnDef<{
	id: number;
	date: Date;
	amount: number;
	status: string;
}>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<div className="relative size-10">
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
					className="absolute top-3 left-1 "
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="relative size-10 grid place-items-center">
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "date",
		header: "Date",
		cell: ({ row }) => {
			return <span>{moment(row.original.date).format("MMM Do YYYY")}</span>;
		},
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => {
			return (
				<span>
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(row.original.amount)}
				</span>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.original.status.toLowerCase();
			return (
				<Badge
					variant={
						status === "paid"
							? "success"
							: status === "pending"
								? "warning"
								: "destructive"
					}
					size="md"
					className="capitalize rounded-sm gap-2"
				>
					{status === "paid" ? (
						<CheckmarkSquare03Icon size={20} strokeWidth={2} />
					) : status === "pending" ? (
						<Loader size={20} strokeWidth={2} />
					) : (
						<X size={20} strokeWidth={2} />
					)}
					{row.original.status}
				</Badge>
			);
		},
	},

	{
		id: "actions",
		cell: ({ row }) => {
			const user = row.original;

			return (
				<div className="flex items-center gap-2 w-fit justify-end">
					<TooltipProvider delayDuration={0}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon">
									<ViewIcon size={18} strokeWidth={2} />
								</Button>
							</TooltipTrigger>
							<TooltipContent className="px-2 py-1 text-sm">
								View Invoice
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon">
									<FileDownloadIcon size={18} strokeWidth={2} />
								</Button>
							</TooltipTrigger>
							<TooltipContent className="px-2 py-1 text-sm">
								Download Invoice
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
	},
];
