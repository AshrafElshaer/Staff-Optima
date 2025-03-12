import { getUserOrganization } from "@optima/database/queries";
import { authClient } from "@/lib/auth/auth-client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "./use-session";

export function useOrganization() {
	const { data: session } = useSession();
	return useQuery({
		queryKey: ["organization"],
		enabled: !!session?.user.id,
		queryFn: async () => {
			if (session?.user.id) {
				return await getUserOrganization(session.user.id);
			}
			return null;
		},
	});
}
