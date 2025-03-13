import { env } from "@/env.mjs";

import {
	createClient as _createClient,
	type SupabaseClient,
} from "@supabase/supabase-js";
// import type { Database } from "@optima/supabase/types";

export function createSupabaseClient() {
	return _createClient(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	);
}

export type { SupabaseClient as SupabaseInstance };
