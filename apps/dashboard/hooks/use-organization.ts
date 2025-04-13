import { getOrganizationById } from "@optima/supabase/queries";

import { useOrganizationStore } from "@/stores/organization";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "./use-session";
import { useSupabase } from "./use-supabase";
export function useOrganization() {
	const { data: session } = useSession();
	const supabase = useSupabase();

	return useQuery({
		queryKey: ["organization"],
		enabled: session != null,
		queryFn: async () => {
			if (session) {
				const { data, error } = await getOrganizationById(
					supabase,
					session.user.user_metadata.organization_id,
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
