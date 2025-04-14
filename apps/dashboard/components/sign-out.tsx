"use client";

import { Button } from "@optima/ui/components/button";
import { usePathname } from "next/navigation";

export function SignOut() {
	const pathname = usePathname();

	return (
		<Button size="sm" variant="destructive" className="w-full">
			Sign out
		</Button>
	);
}
