"use client";

import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@optima/ui/components/button";
import { usePathname, useRouter } from "next/navigation";

export function SignOut() {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<Button
			variant="destructive"
			onClick={async () => {
				await authClient.signOut({
					fetchOptions: {
						onSuccess: () => {
							router.push(`/auth?redirectUrl=${pathname}`);
						},
					},
				});
			}}
			className="w-full"
		>
			Sign out
		</Button>
	);
}
