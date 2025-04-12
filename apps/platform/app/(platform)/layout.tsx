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
import { HomeBreadcrumb } from "@/components/breadcrubms/home-breadcrumb";
import { Inset } from "@/components/sidebars/inset";

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
			<Inset>{children}</Inset>
		</SidebarProvider>
	);
}
