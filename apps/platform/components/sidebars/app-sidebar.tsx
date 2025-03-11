"use client";

import type * as React from "react";

// import { useOrganization } from "@/hooks/use-organization";
// import { useSession } from "@/hooks/use-session";
// import { userRoleEnum } from "@optima/supabase/types";
import { Icons } from "@optima/ui/components/icons";
import { Separator } from "@optima/ui/components/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "@optima/ui/components/sidebar";
import {
	Calendar03Icon,
	Chatting01Icon,
	Home01Icon,
	JobLinkIcon,
	UserSearch01Icon,
} from "hugeicons-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { OrganizationLogo } from "./organization-logo";

const links = [
	{
		title: "Dashboard",
		url: "/",
		icon: <Home01Icon strokeWidth={2} size={20} />,
	},
	{
		title: "Calendar",
		url: "/calendar",
		icon: <Calendar03Icon strokeWidth={2} size={20} />,
	},
	{
		title: "Jobs",
		url: "/jobs",
		icon: <JobLinkIcon strokeWidth={2} size={20} />,
	},

	{
		title: "Candidates",
		url: "/candidates",
		icon: <UserSearch01Icon strokeWidth={2} size={20} />,
	},
];
const communication = [
	{
		title: "Chat",
		url: "/chat",
		icon: <Chatting01Icon strokeWidth={2} size={20} />,
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<OrganizationLogo />
			</SidebarHeader>
			<Separator />
			<SidebarContent>
				<NavMain items={links} label="Workspace" />
				<NavMain items={communication} label="Communication" />
			</SidebarContent>
			{/* <Separator />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter> */}
		</Sidebar>
	);
}
