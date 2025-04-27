import { createBrowserClient as createClient } from "@supabase/ssr";
import type { Database } from "@optima/supabase/types";

export function createBrowserClient() {
	return createClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
	);
}
