"use client";
import { PERMISSIONS } from "@optima/constants";
import type { AccessRole } from "@optima/supabase/types";
import { Button } from "@optima/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@optima/ui/components/dropdown-menu";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@optima/ui/components/table";
import { PencilEdit02Icon } from "hugeicons-react";
import { MoreVertical, Trash } from "lucide-react";
import React from "react";
type Props = {
	roles: AccessRole[];
};
export function RolesTable({ roles }: Props) {
	const groupedByname = Object.groupBy(roles, (role) => role.name) as Record<
		string,
		AccessRole[]
	>;
	return (
		<div className="flex-1 border rounded-md flex flex-col">
			<Table className="">
				{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
				<TableHeader className="bg-accent hover:bg-accent">
					<TableRow className="bg-accent hover:bg-accent divide-x ">
						<TableHead className="text-foreground">Permissions</TableHead>
						{Object.keys(groupedByname).map((roleName) => (
							<TableHead key={roleName} className="text-foreground  w-fit">
								<div className="flex items-center justify-between gap-2">
									{roleName}
									{roleName !== "Owner" ? (
										<RoleDropdown role={groupedByname[roleName]?.[0]} />
									) : null}
								</div>
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{PERMISSIONS.map((perm, permIndex) => (
						<React.Fragment key={`${perm.key}-${permIndex}`}>
							<TableRow
								key={`${perm.key}-${permIndex}-header`}
								className="bg-muted hover:bg-muted"
							>
								<TableCell className="font-medium " colSpan={roles.length + 1}>
									{perm.category}
								</TableCell>
							</TableRow>
							{perm.permissions.map((p, pIndex) => (
								<TableRow
									key={`${perm.key}-${permIndex}-${p.value}-${pIndex}`}
									className="divide-x"
								>
									<TableCell className="text-muted-foreground">
										{p.label}
									</TableCell>
									{Object.keys(groupedByname).map((roleName) => (
										<TableCell
											key={`${perm.key}-${permIndex}-${p.value}-${pIndex}-${roleName}`}
											className="text-center"
										>
											{groupedByname[roleName]?.find((r) =>
												r.permissions.includes(p.value),
											)
												? "Yes"
												: "No"}
										</TableCell>
									))}
								</TableRow>
							))}
						</React.Fragment>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

function RoleDropdown({ role }: { role: AccessRole | undefined }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="ml-auto p-0 size-auto">
					<MoreVertical className="h-4 w-4" strokeWidth={2} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<PencilEdit02Icon className="size-4" strokeWidth={2} />
					Rename
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Trash className="size-4" strokeWidth={2} />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
