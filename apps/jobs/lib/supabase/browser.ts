import { createBrowserClient as createClient } from "@supabase/ssr";
import type { Database } from "@optima/supabase/types";
import { env } from "@/env.mjs";

export function createBrowserClient() {
	return createClient<Database>(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	);
}
