"use client";

import { AnimatePresence, motion } from "motion/react";
import { useQueryStates } from "nuqs";
import React from "react";
import { authSearchParams } from "../auth-search-params";
import { SignIn } from "./sign-in";
import { VerifyOtp } from "./verify-otp";

export function AuthComponent() {
	const [{ auth_type, active_tab }] = useQueryStates(authSearchParams, {
		shallow: true,
	});

	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.div
				key={active_tab}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.25 }}
				className="w-full"
			>
				{active_tab === "sign-in" ? (
					<SignIn />
				) : active_tab === "verify-otp" ? (
					<VerifyOtp />
				) : null}
			</motion.div>
		</AnimatePresence>
	);
}
