"use client";

import { useSupabase } from "@/hooks/use-supabase";
import { getDepartmentsByCompanyId } from "@optima/supabase/queries";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@optima/ui/components/select";
import { Skeleton } from "@optima/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";

type DepartmentSelectorProps = {
	onChange: (department: string) => void;
	value: string;
};

export function DepartmentSelector({
	onChange,
	value,
}: DepartmentSelectorProps) {
	const supabase = useSupabase();
	const { data: departments, isLoading } = useQuery({
		queryKey: ["departments"],
		queryFn: async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) {
				throw new Error("User not found");
			}
			const { data: departments, error } = await getDepartmentsByCompanyId(
				supabase,
				user.user_metadata.company_id,
			);
			if (error) {
				throw error;
			}
			return departments;
		},
	});

	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="capitalize bg-accent w-full">
				<SelectValue placeholder="Select a department" />
			</SelectTrigger>
			<SelectContent>
				{isLoading ? (
					["1", "2", "3"].map((id) => (
						<Skeleton key={id} className="h-8 w-full mb-2 last:mb-0" />
					))
				) : departments?.length === 0 ? (
					<div className="text-muted-foreground h-20  flex items-center justify-center">
						No departments found
					</div>
				) : (
					departments?.map((department) => (
						<SelectItem key={department.id} value={department.id}>
							{department.name}
						</SelectItem>
					))
				)}
			</SelectContent>
		</Select>
	);
}
