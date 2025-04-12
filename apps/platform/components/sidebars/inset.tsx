"use client";

import { AccountBreadcrumb } from "@/components/breadcrubms/account-breadcrumb";
import { HomeBreadcrumb } from "@/components/breadcrubms/home-breadcrumb";
import { JobsBreadcrumb } from "@/components/breadcrubms/jobs-breadcrumb";
import { OrganizationBreadcrumb } from "@/components/breadcrubms/organization-breadcrumb";
import { UserDropdown } from "@/components/user-dropdown";
import { Separator } from "@optima/ui/components/separator";
import { SidebarTrigger } from "@optima/ui/components/sidebar";

import { SidebarInset, useSidebar } from "@optima/ui/components/sidebar";
import { cn } from "@optima/ui/lib/utils";

export function Inset({ children }: { children: React.ReactNode }) {
	return (
		<SidebarInset className="m-2 border md:ml-0 rounded-md">
			<header className="flex h-10 shrink-0 border-b items-center gap-2 transition-[width,height] ease-linear  px-4">
				<SidebarTrigger />
				<div className="flex items-center gap-2 w-full  overflow-x-auto scrollbar-hide">
					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-4"
					/>
					<JobsBreadcrumb />
					<AccountBreadcrumb />
					<OrganizationBreadcrumb />
					<HomeBreadcrumb />
				</div>
				<UserDropdown />
			</header>
			<div className="flex flex-1 flex-col gap-4 ">{children}</div>
		</SidebarInset>
	);
}
