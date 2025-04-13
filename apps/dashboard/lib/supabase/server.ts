import { env } from "@/env.mjs";

import { createServerClient as createClient } from "@supabase/ssr";
import type { Database } from "@optima/supabase/types";
import { cookies } from "next/headers";

type Options =
	| {
			isAdmin: boolean;
	  }
	| undefined;

export async function createServerClient(options?: Options) {
	const cookieStore = await cookies();

	return createClient<Database>(
		env.NEXT_PUBLIC_SUPABASE_URL,
		options?.isAdmin
			? env.SUPABASE_SERVICE_ROLE_KEY
			: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						for (const { name, value, options } of cookiesToSet) {
							cookieStore.set(name, value, options);
						}
					} catch (error) {}
				},
			},
		},
	);
}
