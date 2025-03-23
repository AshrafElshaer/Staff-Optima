"use client";
import { useSession } from "@/hooks/use-session";
import { useSupabase } from "@/hooks/use-supabase";
import { useOrganizationStore } from "@/stores/organization";
import { getTeamMembers } from "@optima/supabase/queries";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@optima/ui/components/avatar";
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
export function MemberSelector({ onChange, value }: MemberSelectorProps) {

	const { data: session } = useSession();
	const supabase = useSupabase()
	const { data: members, isLoading } = useQuery({
		queryKey: ["members"],
		queryFn: async() => {
			const {data,error} = await getTeamMembers(supabase,session?.user.user_metadata.organization_id ?? "")
			if(error){
				throw error
			}
			return data
		},
	});

	return (
		<Select onValueChange={onChange} value={value}>
			<SelectTrigger className="bg-accent w-full border">
				<SelectValue placeholder="Select a member" />
			</SelectTrigger>
			<SelectContent>
				{isLoading
					? [1, 2, 3].map((i) => (
							<SelectItem key={i} value={i.toString()}>
								<Skeleton className="size-5 rounded-full" />
								<Skeleton className="h-4 w-20" />
							</SelectItem>
						))
					: members?.map((member) => {
						const firstName = member.first_name
						const lastName = member.last_name

							return (
								<SelectItem key={member.id} value={member.id}>
									<Avatar className="size-5 rounded-full ">
										<AvatarImage src={member.image ?? undefined} />
										<AvatarFallback>
											{firstName?.charAt(0)}
											{lastName?.charAt(0)}
										</AvatarFallback>
									</Avatar>
									{firstName} {lastName}
									{member.id === session?.user?.id && (
										<span className="text-sm text-muted-foreground ">You</span>
									)}
								</SelectItem>
							);
						})}
			</SelectContent>
		</Select>
	);
}
