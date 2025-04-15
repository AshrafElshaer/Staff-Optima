"use client";
import { buttonVariants } from "@optima/ui/components/button";
import { Icons } from "@optima/ui/components/icons";
import { cn } from "@optima/ui/lib/utils";
import {
	AccountSetting01Icon,
	Notification01Icon,
	PreferenceHorizontalIcon,
	Store01Icon,
	TimeQuarterPassIcon,
} from "hugeicons-react";
import { ClockFading, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ACCOUNT_ROUTES = [
	{
		label: "Account",
		href: "/account",
		icon: <Icons.AccountSetting width={16} height={16} />,
		iconFill: <Icons.AccountSettingFill width={16} height={16} />,
		disabled: false,
	},
	{
		label: "Preferences",
		href: "/account/preferences",
		icon: <SlidersHorizontal size={20} />,
		iconFill: <SlidersHorizontal size={20} />,
		disabled: false,
	},
	{
		label: "Notifications",
		href: "/account/notifications",
		icon: <Icons.Bell width={16} height={16} />,
		iconFill: <Icons.BellFill width={16} height={16} />,
		disabled: false,
	},
	{
		label: "Availability",
		href: "/account/availability",
		// icon: TimeQuarterPassIcon,
		icon: <ClockFading size={20} />,
		iconFill: <ClockFading size={20} />,
		disabled: false,
	},

	{
		label: "App Store",
		href: "/account/app-store",
		icon: <Icons.Store width={16} height={16} />,
		iconFill: <Icons.StoreFill width={16} height={16} />,
		disabled: true,
	},
];

export default function AccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	return (
		<div className="flex flex-col gap-4 flex-1 py-4">
			<nav className="flex items-center gap-2 w-full overflow-x-auto scrollbar-hide">
				{ACCOUNT_ROUTES.map((tab) => {
					const isActive =
						tab.href === "/account"
							? pathname === tab.href
							: pathname.startsWith(tab.href);
					return (
						<Link
							key={tab.href}
							href={tab.disabled ? "#" : tab.href}
							className={cn(
								buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
								"min-w-fit",
								tab.disabled &&
									"pointer-events-none cursor-not-allowed opacity-50",
							)}
						>
							{isActive ? tab.iconFill : tab.icon}
							<span>{tab.label}</span>
						</Link>
					);
				})}
			</nav>
			{children}
		</div>
	);
}
