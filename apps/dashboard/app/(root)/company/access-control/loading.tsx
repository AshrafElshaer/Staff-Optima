import { Button } from "@optima/ui/components/button";
import { Skeleton } from "@optima/ui/components/skeleton";
import { FingerPrintAddIcon } from "hugeicons-react";

export default function RolesAndPermissionsLoading() {
	return (
		<div className="flex flex-col gap-4 flex-1">
			<Button className="w-fit ml-auto" variant="secondary" disabled size="sm">
				<FingerPrintAddIcon className="h-4 w-4" strokeWidth={2} /> Create Role
			</Button>
			<Skeleton className="w-full flex-1" />
		</div>
	);
}
