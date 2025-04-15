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

import { useCompany } from "@/hooks/use-company";
import { Icons } from "@optima/ui/components/icons";
import { cn } from "@optima/ui/lib/utils";
import { Building2, SlidersHorizontal } from "lucide-react";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { NavMain } from "./nav-main";
const general = [
	{
		title: "Departments",
		url: "/company/departments",
		icon: <Icons.DashboardSquare width={20} height={20} />,
		iconFill: <Icons.DashboardSquareFill width={20} height={20} />,
	},
	{
		title: "Roles & Permission",
		url: "/company/access-control",
		icon: <Icons.FingerPrint width={20} height={20} />,
		iconFill: <Icons.FingerPrintFill width={20} height={20} />,
	},
	{
		title: "Team",
		url: "/company/team",
		icon: <Icons.Users width={20} height={20} />,
		iconFill: <Icons.UsersFill width={20} height={20} />,
	},
	{
		title: "Integrations",
		url: "/company/integrations",
		icon: <SlidersHorizontal size={20} />,
		iconFill: <SlidersHorizontal size={20} />,
	},
	{
		title: "Billing & Usage",
		url: "/company/billing",
		icon: <Icons.CreditCard width={20} height={20} />,
		iconFill: <Icons.CreditCardFill width={20} height={20} />,
	},
];
const applications = [
	{
		title: "Workflows",
		url: "/company/workflows",
		icon: <Icons.Workflow width={20} height={20} />,
		iconFill: <Icons.WorkflowFill width={20} height={20} />,
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
		url: "/company/email-templates",
		icon: <Icons.MailAdd width={20} height={20} />,
		iconFill: <Icons.MailAddFill width={20} height={20} />,
	},
];
export function OrganizationSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const router = useRouter();
	const { state, isMobile } = useSidebar();
	const { data: company } = useCompany();
	const settings = [
		{
			title: "Public Profile",
			url: "/company",
			icon: <Icons.Profile width={20} height={20} />,
			iconFill: <Icons.ProfileFill width={20} height={20} />,
			isError: company ? !company.is_domain_verified : false,
		},
		...general,
	];

	return (
		<Sidebar collapsible="offcanvas" variant="floating" {...props}>
			<SidebarHeader>
				<SidebarMenuItem className={cn("flex items-center gap-2 px-2")}>
					<button
						type="button"
						className="cursor-pointer"
						onClick={() => router.push("/")}
					>
						<HiArrowUturnLeft strokeWidth={2} size={14} />
						<span className="sr-only">Back</span>
					</button>
					<span className="text-compact-large font-bold">Settings</span>
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
