"use client";
import { buttonVariants } from "@optima/ui/components/button";
import { cn } from "@optima/ui/lib/utils";
import {
	AccountSetting01Icon,
	Notification01Icon,
	PreferenceHorizontalIcon,
	Store01Icon,
	TimeQuarterPassIcon,
} from "hugeicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ACCOUNT_ROUTES = [
	{
		label: "Account",
		href: "/account",
		icon: AccountSetting01Icon,
		disabled: false,
	},
	{
		label: "Preferences",
		href: "/account/preferences",
		icon: PreferenceHorizontalIcon,
		disabled: false,
	},
	{
		label: "Notifications",
		href: "/account/notifications",
		icon: Notification01Icon,
		disabled: false,
	},
	{
		label: "Availability",
		href: "/account/availability",
		icon: TimeQuarterPassIcon,
		disabled: false,
	},

	{
		label: "App Store",
		href: "/account/app-store",
		icon: Store01Icon,
		disabled: false,
	},
];

export default function AccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	return (
		<main className="flex flex-col gap-4 flex-1">
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
							<tab.icon size={16} strokeWidth={2} />
							<span>{tab.label}</span>
						</Link>
					);
				})}
			</nav>
			{children}
		</main>
	);
}
