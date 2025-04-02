import type { RowSelectionState } from "@tanstack/react-table";
import type { ReactNode } from "react";

type TableSelectToastProps = {
	toastId?: string | number;
	rowSelection: number;
	totalRows: number;
	children: ReactNode;
};

export function TableSelectToast({
	toastId,
	rowSelection,
	children,
	totalRows,
}: TableSelectToastProps) {
	return (
		<div className="inline-flex h-10 items-center justify-center gap-4 px-4 pr-2 py-1 bg-[#131316] rounded-full overflow-hidden shadow-[0px_32px_64px_-16px_#0000004c,0px_16px_32px_-8px_#0000004c,0px_8px_16px_-4px_#0000003d,0px_4px_8px_-2px_#0000003d,0px_-8px_16px_-1px_#00000029,0px_2px_4px_-1px_#0000003d,0px_0px_0px_1px_#000000,inset_0px_0px_0px_1px_#ffffff14,inset_0px_1px_0px_#ffffff33] mx-auto w-full">
			<p className="text-white">
				{rowSelection} / {totalRows} invoices Selected{" "}
			</p>
			{children}
		</div>
	);
}
