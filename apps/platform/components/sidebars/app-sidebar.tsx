"use client";

import type * as React from "react";

import { useSession } from "@/hooks/use-session";
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

const settings = [
	{
		title: "Organization",
		url: "/organization",
		icon: <Building01Icon strokeWidth={2} size={20} />,
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data: session } = useSession();
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<OrganizationLogo />
			</SidebarHeader>
			<Separator />
			<SidebarContent>
				<NavMain items={links} label="Workspace" />
				<NavMain items={communication} label="Communication" />
				{session?.user.role === "admin" || session?.user.role === "owner" ? (
					<NavMain items={settings} label="Settings" />
				) : null}
			</SidebarContent>
		</Sidebar>
	);
}
