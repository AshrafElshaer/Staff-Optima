import { createClient } from "jsr:@supabase/supabase-js@2";
import type { Database } from "../../src/types/database.ts";

export const supabase = createClient<Database>(
	Deno.env.get("SUPABASE_URL") as string,
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string,
);
