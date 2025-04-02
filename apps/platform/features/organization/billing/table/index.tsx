"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { TableSelectToast } from "@/components/toasts/table-select-toast";
import { useActionToast } from "@/hooks/use-action-toast";
import { Button } from "@optima/ui/components/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@optima/ui/components/table";
import { cn } from "@optima/ui/lib/utils";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function BillingTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = useState({});
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			rowSelection,
		},
	});

	const selectedRows = table
		.getSelectedRowModel()
		.rows.map((row) => row.original);

	useActionToast({
		show: !!Object.keys(rowSelection).length,
		ToastContent: ({ toastId }) => (
			<TableSelectToast
				toastId={toastId}
				rowSelection={Object.keys(rowSelection).length}
				totalRows={table.getRowCount()}
			>
				<Button variant="success" size="sm" className="rounded-full ml-auto">
					Download
				</Button>
			</TableSelectToast>
		),
	});

	return (
		<div className="rounded-md border flex-1">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							key={headerGroup.id}
							className="!rounded-full bg-accent hover:bg-accent"
						>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										className={cn(
											header.id === "select" && "w-10 ",
											header.id === "actions" && "w-10 ",
										)}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										className={cn(
											cell.column.id === "select" && "w-10 p-0",
											cell.column.id === "actions" && "w-10",
										)}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
