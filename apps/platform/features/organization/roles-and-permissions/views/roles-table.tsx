"use client";
import React from "react";
import { PERMISSIONS } from "@optima/constants";
import type { AccessRole } from "@optima/supabase/types";
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
type Props = {
	roles: AccessRole[];
};
export function RolesTable({ roles }: Props) {
	const groupedByname = Object.groupBy(roles, (role) => role.name);
	return (
		<div className="flex-1 border rounded-md flex flex-col">
			<Table className="">
				{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
				<TableHeader className="bg-accent hover:bg-accent">
					<TableRow className="bg-accent hover:bg-accent divide-x ">
						<TableHead className="text-foreground">Permissions</TableHead>
						{Object.keys(groupedByname).map((roleName) => (
							<TableHead key={roleName} className="text-foreground">
								{roleName}
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
								<TableCell
									className="font-medium text-base"
									colSpan={roles.length + 1}
								>
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
