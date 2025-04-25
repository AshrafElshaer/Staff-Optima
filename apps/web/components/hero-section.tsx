"use client";

import { Button } from "@optima/ui/components/button";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const hidden = {
	opacity: 0,
	y: 12,
	filter: "blur(12px)",
};

const visible = {
	opacity: 1,
	y: 0,
	filter: "blur(0px)",
};

export default function HeroSection() {
	return (
		<>
			<main>
				<div
					aria-hidden
					className="z-2 absolute inset-0 isolate hidden opacity-50 contain-strict lg:block"
				>
					<div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
					<div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
					<div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
				</div>

				<section className="overflow-hidden">
					<div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-24">
						<div className="relative z-10 mx-auto max-w-4xl text-center">
							<motion.h1
								className="text-balance text-lg sm:text-2xl font-semibold md:text-4xl lg:text-5xl"
								initial={hidden}
								animate={visible}
								transition={{ duration: 0.5, delay: 0.5 }}
							>
								Elevate Your Recruitment Process
								<br />
								with Smart , Seamless , Modern
								<br />
								Applicant Tracking
							</motion.h1>
							<motion.p
								className="text-secondary-foreground w-full sm:w-2/3 mx-auto text-sm md:text-base lg:text-lg text-center my-8"
								initial={hidden}
								animate={visible}
								transition={{ duration: 0.5, delay: 0.6 }}
							>
								Streamline your hiring process with our intelligent applicant
								tracking system that simplifies recruitment workflows and
								candidate management.
							</motion.p>

							<motion.div
								initial={hidden}
								animate={visible}
								transition={{ duration: 0.5, delay: 0.8 }}
							>
								<Button asChild size="lg">
									<Link href="/waitlist">
										<span className="btn-label">Join Waitlist</span>
									</Link>
								</Button>
							</motion.div>
						</div>
					</div>

					<div className="mx-auto -mt-16 max-w-7xl">
						<div className="perspective-distant -mr-16 pl-16 lg:-mr-56 lg:pl-56">
							<motion.div
								initial={hidden}
								animate={visible}
								transition={{ duration: 0.5, delay: 1.1 }}
							>
								<div className="[transform:rotateX(20deg);]">
									<div className="lg:h-176 relative skew-x-[.36rad]">
										<Image
											className="rounded-(--radius) z-1 relative border dark:hidden"
											src="/dashboard-light.png"
											alt="Tailark hero section"
											width={2880}
											height={2074}
										/>
										<Image
											className="rounded-(--radius) z-1 relative hidden border dark:block"
											src="/dashboard-dark.png"
											alt="Tailark hero section"
											width={2880}
											height={2074}
										/>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
