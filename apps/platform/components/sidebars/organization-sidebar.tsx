"use client";

import { Separator } from "@optima/ui/components/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenuItem,
	useSidebar,
} from "@optima/ui/components/sidebar";

import {
	CreditCardIcon,
	DashboardSquare03Icon,
	FingerPrintIcon,
	FingerprintScanIcon,
	MailAdd02Icon,
	Profile02Icon,
	SlidersHorizontalIcon,
	UserMultipleIcon,
	WorkflowSquare10Icon,
} from "hugeicons-react";

import { useRouter } from "next/navigation";
import type * as React from "react";

import { useOrganization } from "@/hooks/use-organization";
import { cn } from "@optima/ui/lib/utils";
import { Building2 } from "lucide-react";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { NavMain } from "./nav-main";

const general = [
	{
		title: "Departments",
		url: "/organization/departments",
		icon: <DashboardSquare03Icon strokeWidth={2} size={20} />,
	},
	{
		title: "Roles & Permissions",
		url: "/organization/access-control",
		icon: <FingerPrintIcon strokeWidth={2} size={20} />,
	},
	{
		title: "Team",
		url: "/organization/team",
		icon: <UserMultipleIcon strokeWidth={2} size={20} />,
	},
	{
		title: "Integrations",
		url: "/organization/integrations",
		icon: <SlidersHorizontalIcon strokeWidth={2} size={20} />,
	},
	{
		title: "Billing & Usage",
		url: "/organization/billing",
		icon: <CreditCardIcon strokeWidth={2} size={20} />,
	},
];
const applications = [
	{
		title: "Workflows",
		url: "/organization/workflows",
		icon: <WorkflowSquare10Icon strokeWidth={2} size={20} />,
	},
];

const communication = [
	// {
	//   title: "Chat Channels",
	//   url: "/organization/chat-channels",
	//   icon: <FaHashtag strokeWidth={1} className="size-[20px]" />,
	// },
	{
		title: "Email Templates",
		url: "/organization/email-templates",
		icon: <MailAdd02Icon strokeWidth={2} className="size-[20px]" />,
	},
];
export function OrganizationSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const router = useRouter();
	const { state, isMobile } = useSidebar();
	const { data: organization } = useOrganization();
	const settings = [
		{
			title: "Public Profile",
			url: "/organization",
			icon: <Profile02Icon strokeWidth={2} size={20} />,
			isError: organization ? !organization.is_domain_verified : false,
		},
		...general,
	];

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenuItem
					className={cn(
						"flex items-center gap-2 p-2",
						state === "collapsed" && " justify-center",
						isMobile && state === "collapsed" && "justify-start ",
					)}
				>
					<button
						type="button"
						className="cursor-pointer"
						onClick={() => router.push("/")}
					>
						<HiArrowUturnLeft strokeWidth={2} size={14} />
						<span className="sr-only">Back</span>
					</button>
					{(state === "expanded" || (isMobile && state === "collapsed")) && (
						<span className="text-compact-large font-bold">Settings</span>
					)}
				</SidebarMenuItem>
			</SidebarHeader>
			<Separator />
			<SidebarContent>
				<NavMain items={settings} label="General" />
				<NavMain items={applications} label="Applications" />
				<NavMain items={communication} label="Communication" />
			</SidebarContent>
			<Separator />
		</Sidebar>
	);
}
