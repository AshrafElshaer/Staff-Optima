import { Button, buttonVariants } from "@optima/ui/components/button";
import { cn } from "@optima/ui/lib/utils";
import { Icons } from "@optima/ui/components/icons";
import { Input } from "@optima/ui/components/inputs";
import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

const socialLinks = [
	{
		name: "Twitter",
		href: "https://twitter.com/staffoptima",
		icon: <FaXTwitter size={24} />,
	},
	{
		name: "GitHub",
		href: "https://github.com/staff-optima",
		icon: <FaGithub size={24} />,
	},
];

const links = [
	{
		title: "Resources",
		links: [
			{
				name: "Support",
				href: "/support",
			},
			{
				name: "Features Request",
				href: "https://github.com/staff-optima/staff-optima/issues",
			},
			{
				name: "GitHub",
				href: "https://github.com/staff-optima",
			},
			{
				name: "Privacy Policy",
				href: "/privacy",
			},
			{
				name: "Terms of Service",
				href: "/terms",
			},
		],
	},
	{
		title: "Company",
		links: [
			{ name: "Story", href: "/story" },
			{ name: "Updates", href: "/updates" },
			{
				name: "Open Startup",
				href: "/open-startup",
			},
		],
	},
];

export function Footer() {
	return (
		<footer className="pt-12">
			{/* <div className="grid  grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
        <div className="flex flex-col gap-2">
          <p className=" font-bold mb-2">Sections</p>
          <Link
            href="/"
            className={buttonVariants({
              variant: "link",
              className: "!justify-start",
            })}
          >
            Home
          </Link>
          <Link
            href="/features"
            className={buttonVariants({
              variant: "link",
              className: "!justify-start",
            })}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className={buttonVariants({
              variant: "link",
              className: "!justify-start",
            })}
          >
            Pricing
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <p className=" font-bold mb-2">Resources</p>
          <Link
            href="/about"
            className={buttonVariants({
              variant: "link",
              className: "!justify-start",
            })}
          >
            Support
          </Link>
          <Link
            href="https://github.com/staff-optima"
            className={buttonVariants({
              variant: "link",
              className: "!justify-start",
            })}
          >
            GitHub
          </Link>
          <Link
            href="https://github.com/staff-optima/staff-optima/issues"
            className={buttonVariants({
              variant: "link",
              className: "!justify-start",
            })}
          >
            Features Request
          </Link>
        </div>
      </div> */}

			{/* <section className=" px-4 sm:px-6 lg:px-8 py-10  sm:pt-16 lg:pt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {links.map((link) => (
          <div key={link.title} className="flex flex-col ">
            <p className="font-bold mb-4">{link.title}</p>
            {link.links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={buttonVariants({
                  variant: "link",
                  className: "!justify-start !px-0",
                })}
              >
                {link.name}
              </Link>
            ))}
          </div>
        ))}

        <div className="lg:col-span-2 flex flex-col lg:items-end gap-4">
          <div className="flex items-center justify-start w-full md:w-2/3">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={buttonVariants({
                  variant: "link",
                })}
              >
                {link.icon}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-4 w-full md:w-2/3 ">
            {/* <div className="w-1/2">
            </div> */}
			{/* <Input placeholder="Enter your email to get updates" /> */}

			{/* <Button>Subscribe</Button> */}
			{/* </div> */}
			{/* </div> */}
			{/* </section> */}

			{/* <section className=" w-full text-center mt-4 items-center justify-center py-12 space-y-8">
        <h1 className="text-center text-6xl md:text-8xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-900 select-none ">
          Staff Optima
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 select-none">
          Hire Smarter, Hire Faster
        </p>
      </section> */}

			<div className=" text-sm  flex flex-col gap-2 sm:flex-row items-center justify-between border-t p-4">
				<p>
					&copy; {new Date().getFullYear()} Staff Optima. All rights reserved.
				</p>
				<div className="flex gap-2">
					<Link
						href="/privacy"
						className={cn(buttonVariants({ variant: "link" }), "!p-0")}
					>
						Privacy Policy
					</Link>
					<Link
						href="/terms"
						className={cn(buttonVariants({ variant: "link" }), "!p-0")}
					>
						Terms of Service
					</Link>
				</div>
			</div>
		</footer>
	);
}
