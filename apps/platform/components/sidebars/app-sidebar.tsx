"use client";

import type * as React from "react";

import { useUserRole } from "@/hooks/use-user-role";
import { hasPermission } from "@/lib/auth/has-permission";
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
	{
		title: "Chat",
		url: "/chat",
		icon: <Chatting01Icon strokeWidth={2} size={20} />,
	},
];
// const communication = [

// ];

const settings = [
	{
		title: "Organization",
		url: "/organization",
		icon: <Building01Icon strokeWidth={2} size={20} />,
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
