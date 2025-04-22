import { sidebarLinks } from "@/components/sidebars/app-sidebar";

import { Button } from "@optima/ui/components/button";
import { Icons } from "@optima/ui/components/icons";
import { Separator } from "@optima/ui/components/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarProvider,
	SidebarTrigger,
} from "@optima/ui/components/sidebar";
import { Skeleton } from "@optima/ui/components/skeleton";
import { cn } from "@optima/ui/lib/utils";

export default function ShellLoading() {
	return (
		<SidebarProvider>
			<Sidebar collapsible="offcanvas" variant="floating">
				<SidebarHeader>
					<div className={cn("flex items-center gap-2 px-2")}>
						<Skeleton className="size-6 rounded-sm" />
						<Skeleton className="w-full h-6 rounded-sm" />
					</div>
				</SidebarHeader>
				<Separator />
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Workspace</SidebarGroupLabel>
						<SidebarMenu>
							{Array.from({ length: 5 }).map((_, index) => (
								<SidebarMenuItem key={index.toString()}>
									<SidebarMenuSkeleton />
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
			<SidebarInset className="my-2 mx-4  gap-4   rounded-md">
				<header className="flex h-10 bg-sidebar shrink-0 border rounded-md items-center gap-2 transition-[width,height] ease-linear  px-2">
					<SidebarTrigger disabled />
					<div className="flex items-center gap-2 w-full  overflow-x-auto scrollbar-hide">
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<Skeleton className="h-4 w-24" />
					</div>
					<Skeleton className="size-4 rounded-full" />
				</header>
				<div className="flex flex-1 flex-col gap-4 justify-center items-center">
					<Icons.Logo className="size-16" />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
