import { createBrowserClient } from "@/lib/supabase/browser";

export function useSupabase() {
	return createBrowserClient();
}
