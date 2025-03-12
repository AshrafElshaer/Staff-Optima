import { useSession } from "@/hooks/use-session";
import { authClient } from "@/lib/auth/auth-client";
import { queryClient } from "@/lib/react-query";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@optima/ui/components/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@optima/ui/components/dropdown-menu";
import { useSidebar } from "@optima/ui/components/sidebar";
import { Skeleton } from "@optima/ui/components/skeleton";
import { useIsMobile } from "@optima/ui/hooks/use-mobile";
import { CommentAdd01Icon, Door01Icon, Settings01Icon } from "hugeicons-react";
import { Headset, Loader, MonitorCog, Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function UserDropdown() {
	const { data, isPending } = useSession();
	const { setTheme } = useTheme();
	const { toggleSidebar } = useSidebar();
	const isMobile = useIsMobile();
	const pathname = usePathname();
	const router = useRouter();
	const [isLoggingOut, startTransition] = useTransition();
	if (isPending) {
		return <Skeleton className="h-8 w-8 rounded-full" />;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-40">
				<DropdownMenuLabel>
					<span className="font-medium">{data?.user?.name}</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger className="gap-2">
							<SunMoon strokeWidth={2} className="size-[20px]" />
							Theme
						</DropdownMenuSubTrigger>

						<DropdownMenuSubContent
							className="*:cursor-pointer"
							sideOffset={10}
						>
							<DropdownMenuItem onSelect={() => setTheme("light")}>
								<Sun />
								Light
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={() => setTheme("dark")}>
								<Moon />
								Dark
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={() => setTheme("system")}>
								<MonitorCog />
								System
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
					<DropdownMenuItem asChild className="cursor-pointer">
						<Link href="/account">
							<Settings01Icon strokeWidth={2} />
							Account
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem>
						<Headset strokeWidth={2} />
						Support
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CommentAdd01Icon strokeWidth={2} />
						Feedback
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					disabled={isLoggingOut}
					className="cursor-pointer"
					onSelect={(e) => {
						e.preventDefault();
						startTransition(() => {
							authClient.signOut({
								fetchOptions: {
									onError: ({ error }) => {
										toast.error(error.message);
									},
									onSuccess: () => {
										queryClient.invalidateQueries({
											queryKey: ["session"],
										});
										router.push(`/auth?redirectUrl=${pathname}`);
									},
								},
							});
						});
					}}
				>
					{isLoggingOut ? (
						<Loader className="size-4 animate-spin" />
					) : (
						<Door01Icon strokeWidth={2} />
					)}
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
