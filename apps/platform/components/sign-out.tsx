"use client";


import { Button } from "@optima/ui/components/button";
import { usePathname } from "next/navigation";

export function SignOut() {
	const pathname = usePathname();

	return (
		<Button
			variant="destructive"

			className="w-full"
		>
			Sign out
		</Button>
	);
}
