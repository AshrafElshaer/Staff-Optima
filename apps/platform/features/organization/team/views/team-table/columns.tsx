"use client";

import type { AccessRole, User } from "@optima/supabase/types";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@optima/ui/components/avatar";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Member extends User {
	role: AccessRole | undefined;
}

export const columns: ColumnDef<Member>[] = [
	{
		accessorFn: (row) => `${row.first_name} ${row.last_name}`,
		header: "Name",
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<Avatar>
					<AvatarImage src={row.original.image || undefined} />
					<AvatarFallback>
						{(row.original?.first_name?.[0]?.toUpperCase() ?? "") +
							(row.original?.last_name?.[0]?.toUpperCase() ?? "")}
					</AvatarFallback>
				</Avatar>
				<span>{`${row.original.first_name} ${row.original.last_name}`}</span>
			</div>
		),
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => (
			<Link href={`mailto:${row.original.email}`}>{row.original.email}</Link>
		),
	},
	{
		accessorFn: (row) => row.role?.name,
		header: "Role",
	},
	{
		accessorFn: (row) => row.phone_number,
		header: "Phone Number",
		cell: ({ row }) => (
			<Link href={`tel:${row.original.phone_number}`}>
				{row.original.phone_number}
			</Link>
		),
	},
];
