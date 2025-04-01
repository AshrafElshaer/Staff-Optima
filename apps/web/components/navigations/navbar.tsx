"use client";

import Link from "next/link";
import type * as React from "react";

import { scrollToSection } from "@/lib/scroll-to-section";
import { Button, buttonVariants } from "@optima/ui/components/button";
import { cn } from "@optima/ui/lib/utils";

import { Icons } from "@optima/ui/components/icons";
import { Separator } from "@optima/ui/components/separator";
import { usePathname, useRouter } from "next/navigation";

import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MobileNavbar } from "./mobile-navbar";

export function Navbar() {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<nav
			className={cn(
				"flex flex-col sm:flex-row sm:items-center space-y-10 sm:space-y-0 fixed top-4 left-4 right-4 z-50  max-w-3xl mx-auto px-4 py-3 rounded-md border bg-accent transition-all duration-300 h-12",
			)}
		>
			<div className="flex items-center justify-between w-full sm:w-fit gap-4">
				<Link href="/" className="cursor-pointer flex items-center gap-2">
					<Icons.Logo />
					<span className=" font-bold min-w-fit">Staff Optima</span>
				</Link>

				{/* <Separator orientation="vertical" className=" h-8 hidden sm:block" /> */}
				<MobileNavbar />
			</div>
			<div className="items-center ml-auto hidden sm:flex">
				<Link
					href="https://github.com/AshrafElshaer/staff-Optima"
					target="_blank"
					className={buttonVariants({ variant: "ghost" })}
				>
					<FaGithub className="size-4 " /> Github
				</Link>
				<Link
					href="https://x.com/staffoptima"
					className={buttonVariants({ variant: "ghost" })}
					target="_blank"
				>
					<FaXTwitter className="size-4 " /> Twitter
				</Link>
				{/* <Button
          variant="ghost"
          onClick={() => {
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
        </Button> */}

				{/* <Button
          variant="ghost"
          onClick={() => {
            if (pathname === "/") {
              scrollToSection("pricing");
            } else {
              router.push("/");
              setTimeout(() => {
                scrollToSection("pricing");
              }, 50);
            }
          }}
        >
          Pricing
        </Button> */}

				{/* <Button
          variant="ghost"
          onClick={() => {
            router.push("/updates");
          }}
        >
          Updates
        </Button> */}
				{/* <Button
          variant="ghost"
          onClick={() => {
            router.push("/story");
          }}
        >
          Story
        </Button> */}
				{/* <Separator orientation="vertical" className="ml-auto h-8" />
        <Button
          variant="ghost"
          onClick={() => {
            const emailInput = document.getElementById("waitlist-email");
            if (emailInput) {
              scrollToSection("hero").then(() => {
                setTimeout(() => {
                  emailInput.focus();
                }, 100);
              });
            }
          }}
        >
          Join Waitlist
        </Button> */}
			</div>
		</nav>
	);
}
