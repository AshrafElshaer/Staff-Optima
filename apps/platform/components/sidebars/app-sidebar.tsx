"use client";

import type * as React from "react";

import { useUserRole } from "@/hooks/use-user-role";
import { hasPermission } from "@/lib/auth/has-permission";
import { Icons } from "@optima/ui/components/icons";
import { Separator } from "@optima/ui/components/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "@optima/ui/components/sidebar";
import {
	Building01Icon,
	Calendar03Icon,
	Chatting01Icon,
	Home01Icon,
	JobLinkIcon,
	UserSearch01Icon,
} from "hugeicons-react";
import { NavMain } from "./nav-main";

import { PERMISSIONS } from "@optima/constants";
import { OrganizationLogo } from "./organization-logo";

const links = [
	{
		title: "Dashboard",
		url: "/",
		icon: <Icons.Home width={20} height={20} />,
		iconFill: <Icons.HomeFill width={20} height={20} />,
	},
	{
		title: "Calendar",
		url: "/calendar",
		icon: <Icons.Calendar width={20} height={20} />,
		iconFill: <Icons.CalendarFill width={20} height={20} />,
	},
	{
		title: "Jobs",
		url: "/jobs",
		icon: <Icons.JobLink width={20} height={20} />,
		iconFill: <Icons.JobLinkFill width={20} height={20} />,
	},

	{
		title: "Candidates",
		url: "/candidates",
		icon: <Icons.UserSearch width={20} height={20} />,
		iconFill: <Icons.UserSearchFill width={20} height={20} />,
	},
	{
		title: "Messages",
		url: "/messages",
		icon: <Icons.Messages width={20} height={20} />,
		iconFill: <Icons.MessagesFill width={20} height={20} />,
	},
];
// const communication = [

// ];

const settings = [
	{
		title: "Organization",
		url: "/organization",
		icon: <Icons.Plaza width={20} height={20} />,
		iconFill: <Icons.PlazaFill width={20} height={20} />,
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data: userRole } = useUserRole();
	const hasOrganizationPermission = hasPermission(
		userRole?.role.permissions ?? [],
		[
			"settings:organization",
			"settings:template",
			"settings:workflow",
			"settings:integration",
			"user:add",
			"user:update",
			"user:delete",
		],
	);
	return (
		<Sidebar collapsible="icon" variant="floating" {...props}>
			<SidebarHeader>
				<OrganizationLogo />
			</SidebarHeader>
			<Separator />
			<SidebarContent>
				<NavMain items={links} label="Workspace" />
				{/* <NavMain items={communication} label="Communication" /> */}
				{hasOrganizationPermission ? (
					<NavMain items={settings} label="Settings" />
				) : null}
			</SidebarContent>
		</Sidebar>
	);
}
