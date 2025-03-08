import { Auth } from "@/features/auth/views";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Auth",
};

export default function AuthPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Auth />
		</Suspense>
	);
}
