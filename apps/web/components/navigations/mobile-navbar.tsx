import { scrollToSection } from "@/lib/scroll-to-section";
import { buttonVariants, Button } from "@optima/ui/components/button";
import { cn } from "@optima/ui/lib/utils";
import { Icons } from "@optima/ui/components/icons";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@optima/ui/components/sheet";

import { Menu03Icon } from "hugeicons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const MobileNavbar = () => {
	const pathname = usePathname();
	const router = useRouter();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	return (
		<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
			<SheetTrigger className=" ml-auto sm:hidden">
				<Menu03Icon size={20} />
			</SheetTrigger>
			<SheetContent side="left" className="w-80">
				<SheetHeader>
					<SheetTitle className="flex items-center gap-4">
						<Icons.Logo /> Staff Optima
					</SheetTitle>
				</SheetHeader>
				<div className={cn("  flex flex-col flex-1 divide-y")}>
					<Link
						href="https://github.com/AshrafElshaer/staff-Optima"
						target="_blank"
						className={buttonVariants({
							variant: "ghost",
							size: "lg",
							className: "w-full !justify-start text-lg py-6 rounded-none",
						})}
					>
						<FaGithub className="size-4 " /> Github
					</Link>
					<Link
						href="https://x.com/AshrafElshaer98"
						className={buttonVariants({
							variant: "ghost",
							size: "lg",
							className: "w-full !justify-start text-lg py-6 rounded-none",
						})}
						target="_blank"
					>
						<FaXTwitter className="size-4 " /> Twitter
					</Link>
					{/* <Button
            variant="ghost"
            className="w-full justify-start text-lg py-6 rounded-none"
            size="lg"
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (pathname === "/") {
                scrollToSection("features");
              } else {
                router.push("/");
                setTimeout(() => {
                  scrollToSection("features");
                }, 50);
              }
            }}
          >
            Features
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-lg py-6 rounded-none"
            size="lg"
            onClick={() => {
              if (pathname === "/") {
                scrollToSection("pricing");
              } else {
                router.push("/");
                setTimeout(() => {
                  scrollToSection("pricing");
                }, 50);
              }
              setIsMobileMenuOpen(false);
            }}
          >
            Pricing
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start text-lg py-6 rounded-none"
            onClick={() => {
              setIsMobileMenuOpen(false);
              router.push("/updates");
            }}
          >
            Updates
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start text-lg py-6 rounded-none"
            onClick={() => {
              setIsMobileMenuOpen(false);
              router.push("/story");
            }}
          >
            Story
          </Button> */}
					<div className="p-4 mt-auto">
						<Button
							className="w-full justify-start mt-auto"
							size="lg"
							onClick={() => {
								setIsMobileMenuOpen(false);
								router.push("/waitlist");
							}}
						>
							Join Waitlist
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};
