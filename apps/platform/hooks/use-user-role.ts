import { getUserRole } from "@optima/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "./use-session";
import { useSupabase } from "./use-supabase";
export function useUserRole() {
	const { data: session } = useSession();
	const supabase = useSupabase();
	return useQuery({
		queryKey: ["user-role"],
		queryFn: async () => {
			const { data, error } = await getUserRole(
				supabase,
				session?.user.id ?? "",
			);
			if (error) {
				throw error;
			}
			return data;
		},
		enabled: !!session?.user.id,
	});
}
