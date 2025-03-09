"use client";

import { motion } from "framer-motion";

import type React from "react";

type Props = {
	children: React.ReactNode;
};

export default function OnboardingTemplate({ children }: Props) {
	return (
		<main className="min-h-[100svh] flex  items-center justify-center py-8 px-4 w-full max-w-2xl mx-auto">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ ease: "easeInOut", duration: 0.5 }}
			>
				{children}
			</motion.div>
		</main>
	);
}
