import { authClient } from "@/lib/auth/auth-client";
import { useQuery } from "@tanstack/react-query";

export function useSession() {
	return useQuery({
		queryKey: ["session"],
		queryFn: async () => {
			const { data, error } = await authClient.getSession();
			if (error) {
				throw error;
			}
			return data;
		},
	});
}
