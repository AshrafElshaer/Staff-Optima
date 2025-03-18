import { Button } from "@optima/ui/components/button";
import { Input } from "@optima/ui/components/inputs";
import { Skeleton } from "@optima/ui/components/skeleton";
import { Plus, Search } from "lucide-react";

export default function DepartmentsLoading() {
	return (
		<div className="flex flex-col gap-8 flex-1">
			<section className="flex items-center gap-4 justify-between">
				<Input
					placeholder="Search by name"
					startIcon={<Search className="size-4" />}
					disabled
				/>
				<Button variant="secondary" disabled>
					<Plus className="size-" />
					New Department
				</Button>
			</section>

			<section className=" grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-3">
				{[1, 2, 3].map((department) => (
					<Skeleton key={department} className="h-28 w-full" />
				))}
			</section>
		</div>
	);
}
