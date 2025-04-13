import { getUserPreferences } from "@optima/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "./use-supabase";

export function useUserPreferences() {
	const supabase = useSupabase();
	return useQuery({
		queryKey: ["user-preferences"],
		queryFn: async () => {
			const { data, error } = await getUserPreferences(supabase);
			if (error) throw error;
			return data;
		},
	});
}
