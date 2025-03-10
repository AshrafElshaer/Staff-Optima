"use client";

import { signOutAction } from "@/features/auth/auth.actions";
import { Button } from "@optima/ui/components/button";
import { usePathname } from "next/navigation";

export function SignOut() {
	const pathname = usePathname();

	return (
		<Button
			variant="destructive"
			onClick={() => signOutAction({ redirectUrl: pathname })}
			className="w-full"
		>
			Sign out
		</Button>
	);
}
