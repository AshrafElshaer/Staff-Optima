"use client";
import { useSession } from "@/hooks/use-session";
import { useSupabase } from "@/hooks/use-supabase";

import { getCompanyRoles } from "@optima/supabase/queries";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@optima/ui/components/select";
import { Skeleton } from "@optima/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";

type MemberSelectorProps = {
	onChange: (value: string) => void;
	value: string;
};
export function RoleSelector({ onChange, value }: MemberSelectorProps) {
	const { data: session } = useSession();
	const supabase = useSupabase();
	const { data: roles, isLoading } = useQuery({
		queryKey: ["roles"],
		queryFn: async () => {
			const { data, error } = await getCompanyRoles(
				supabase,
				session?.user.user_metadata.company_id ?? "",
			);
			if (error) {
				throw error;
			}
			return data;
		},
	});

	return (
		<Select onValueChange={onChange} value={value}>
			<SelectTrigger className="bg-accent w-full border">
				<SelectValue placeholder="Select a role" />
			</SelectTrigger>
			<SelectContent>
				{isLoading
					? [1, 2, 3].map((i) => (
							<SelectItem key={i} value={i.toString()}>
								<Skeleton className="h-4 w-20" />
							</SelectItem>
						))
					: roles
							?.filter((role) => role.name !== "Owner")
							?.map((role) => {
								return (
									<SelectItem key={role.id} value={role.id}>
										{role.name}
									</SelectItem>
								);
							})}
			</SelectContent>
		</Select>
	);
}
