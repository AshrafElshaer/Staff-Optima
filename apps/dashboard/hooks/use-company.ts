import { getCompanyById } from "@optima/supabase/queries";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "./use-session";
import { useSupabase } from "./use-supabase";
export function useCompany() {
	const { data: session } = useSession();
	const supabase = useSupabase();

	return useQuery({
		queryKey: ["company"],
		enabled: session != null,
		queryFn: async () => {
			if (session) {
				const { data, error } = await getCompanyById(
					supabase,
					session.user.user_metadata.company_id,
				);
				if (error) {
					throw new Error(error.message);
				}
				return data;
			}
			return null;
		},
	});
}
