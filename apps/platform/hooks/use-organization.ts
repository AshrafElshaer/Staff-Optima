import { getUserOrganization } from "@optima/database/queries";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "./use-session";
import { useOrganizationStore } from "@/stores/organization";
export function useOrganization() {
	const { data: session } = useSession();
	const setOrganization = useOrganizationStore(
		(state) => state.setOrganization,
	);
	return useQuery({
		queryKey: ["organization"],
		enabled: !!session?.user.id,
		queryFn: async () => {
			if (session?.user.id) {
				const organization = await getUserOrganization(session.user.id);
				if (organization) {
					setOrganization(organization);
					return organization;
				}
			}
			return null;
		},
	});
}
