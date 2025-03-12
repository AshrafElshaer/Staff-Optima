"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@optima/ui/components/avatar";
import { Separator } from "@optima/ui/components/separator";

import { JobsBreadcrumb } from "@/components/breadcrubms/jobs-breadcrumb";
import { AppSidebar } from "@/components/sidebars/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@optima/ui/components/sidebar";
import { UserDropdown } from "@/components/user-dropdown";

export default function PlatformLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-2">
					<SidebarTrigger />
					<div className="flex items-center gap-2 w-full  overflow-x-auto scrollbar-hide">
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<JobsBreadcrumb />
					</div>
					<UserDropdown />
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
