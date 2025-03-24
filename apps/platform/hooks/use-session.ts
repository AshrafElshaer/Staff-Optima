import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "./use-supabase";
export function useSession() {
	const supabase = useSupabase();
	return useQuery({
		queryKey: ["session"],
		queryFn: async () => {
			const { data, error } = await supabase.auth.getSession();
			if (error) {
				throw error;
			}
			return data.session;
		},
	});
}
