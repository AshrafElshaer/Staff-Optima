"use client";

import { Separator } from "@optima/ui/components/separator";

import { AccountBreadcrumb } from "@/components/breadcrubms/account-breadcrumb";
import { JobsBreadcrumb } from "@/components/breadcrubms/jobs-breadcrumb";
import { AppSidebar } from "@/components/sidebars/app-sidebar";
import { UserDropdown } from "@/components/user-dropdown";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@optima/ui/components/sidebar";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { OrganizationSidebar } from "@/components/sidebars/organization-sidebar";
import { OrganizationBreadcrumb } from "@/components/breadcrubms/organization-breadcrumb";

export default function PlatformLayout({
	children,
}: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isOrganization = pathname.startsWith("/organization");
	return (
		<SidebarProvider>
			<AnimatePresence mode="wait" initial={false}>
				<motion.div
					key={isOrganization ? "organization" : "app"}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.15 }}
				>
					{isOrganization ? <OrganizationSidebar /> : <AppSidebar />}
				</motion.div>
			</AnimatePresence>
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-2">
					<SidebarTrigger />
					<div className="flex items-center gap-2 w-full  overflow-x-auto scrollbar-hide">
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<JobsBreadcrumb />
						<AccountBreadcrumb />
						<OrganizationBreadcrumb />
					</div>
					<UserDropdown />
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
