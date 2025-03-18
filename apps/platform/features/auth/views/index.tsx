"use client";
import { AnimatePresence, motion } from "motion/react";
import { useQueryStates } from "nuqs";
import { authSearchParams } from "../auth.searchparams";
import { SignIn } from "./sign-in";
import { VerifyOtp } from "./verify-otp";

export function Auth() {
	const [{ activeTab }] = useQueryStates(authSearchParams);
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<AnimatePresence mode="wait" initial={false}>
				{activeTab === "sign-in" ? (
					<motion.div
						key="sign-in"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.4 }}
					>
						<SignIn />
					</motion.div>
				) : (
					<motion.div
						key="verify-otp"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.4 }}
						className="w-full"
					>
						<VerifyOtp />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
