import { getUserRole } from "@optima/database/queries";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "./use-session";

export function useUserRole() {
	const { data: session } = useSession();
	return useQuery({
		queryKey: ["user-role"],
		queryFn: () => getUserRole(session?.user.id ?? ""),
		enabled: !!session?.user.id,
	});
}
