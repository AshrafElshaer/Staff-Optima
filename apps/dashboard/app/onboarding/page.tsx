"use client";

import { TextGenerateEffect } from "@/components/magic-ui/text-animate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingPage() {
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => {
			router.push("/onboarding/user");
		}, 4500);
	}, [router]);
	return (
		<TextGenerateEffect
			words="Welcome to Staff Optima! We're thrilled to have you onboard. Next, we need more information to set you up for success."
			className="w-full "
		/>
	);
}
