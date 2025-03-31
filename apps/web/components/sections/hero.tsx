import { Meteors } from "@optima/ui/components/magicui/meteors";
import { Badge } from "@optima/ui/components/badge";
import { Button } from "@optima/ui/components/button";
import { Input } from "@optima/ui/components/inputs";
import Image from "next/image";
import React from "react";
import { BorderBeam } from "@optima/ui/components/magicui/border-beam";
import { Waitlist } from "../waitlist";

export function Hero() {
	return (
		<header
			className="max-w-4xl mx-auto  w-full pt-32 pb-12 flex flex-col gap-4 relative overflow-hidden"
			id="hero"
		>
			<Badge variant="warning" size="md" className="w-fit mx-auto">
				Building in Progress,
				<span className="hidden sm:inline mx-1">Hang tight & </span> join the
				waitlist to stay tuned
			</Badge>
			<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-left md:text-center">
				Elevate Your Recruitment Process
				<br />
				with Smart , Seamless , Modern
				<br />
				Applicant Tracking
			</h1>
			<p className="text-secondary-foreground w-2/3 md:mx-auto text-sm md:text-base lg:text-lg text-left md:text-center">
				Streamline your hiring process with our intelligent applicant tracking
				system that simplifies recruitment workflows and candidate management.
			</p>
			<Waitlist />

			<div className="relative w-full overflow-hidden rounded-md border bg-background mt-12">
				<Image
					src="/dashboard.png"
					alt="Hero Image"
					width={0}
					height={0}
					sizes="100vw"
					className="w-full h-auto"
				/>
				<BorderBeam size={250} duration={12} delay={9} />
			</div>
			<Meteors number={50} angle={290} />
		</header>
	);
}
