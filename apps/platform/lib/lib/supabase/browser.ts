import { env } from "@/env.mjs";

import { createBrowserClient as createClient } from "@supabase/ssr";
import type { Database } from "@optima/supabase/types";

export function createBrowserClient() {
  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
