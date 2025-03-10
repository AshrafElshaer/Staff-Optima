"use client";

import { authClient } from "@/lib/auth/auth-client";
import { getUserOrganization } from "@optima/database/queries";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@optima/ui/components/avatar";
import {
	SidebarMenu,
	SidebarMenuItem,
	useSidebar,
} from "@optima/ui/components/sidebar";
import { Skeleton } from "@optima/ui/components/skeleton";
import { cn } from "@optima/ui/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function OrganizationLogo() {
	const { state, isMobile } = useSidebar();
	const { data: organization, isLoading } = useQuery({
		queryKey: ["organization"],
		queryFn: async () => {
			try {
				const { data: session } = await authClient.getSession();
				return await getUserOrganization(session?.user.id ?? "");
			} catch (error) {
				console.error(error);
				return null;
			}
		},
	});

	if (isLoading || !organization) {
		return (
			<div
				className={cn(
					"flex items-center gap-2 p-2",
					state === "collapsed" && "justify-center !p-0",
				)}
			>
				<Skeleton className="size-6 rounded-sm" />
				{state === "expanded" && <Skeleton className="w-full h-6 rounded-sm" />}
			</div>
		);
	}
	return (
		<SidebarMenu>
			<SidebarMenuItem
				className={cn(
					"flex items-center gap-2 p-2",
					state === "collapsed" && "p-0 justify-center",
					isMobile && state === "collapsed" && "justify-start !p-2",
				)}
			>
				<Avatar className="size-6 rounded-sm">
					<AvatarImage src={organization?.logo ?? ""} className="rounded-sm" />
					<AvatarFallback className="border text-sm rounded-sm font-bold">
						{organization?.name[0]}
						{organization?.name[1]}
					</AvatarFallback>
				</Avatar>
				{(state === "expanded" || (isMobile && state === "collapsed")) && (
					<span className="text-compact-large font-bold">
						{organization?.name}
					</span>
				)}
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
