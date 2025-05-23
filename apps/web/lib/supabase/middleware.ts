import { createServerClient } from "@supabase/ssr";
import type { Database } from "@optima/supabase/types";
import type { NextRequest, NextResponse } from "next/server";

export const updateSession = async (
	request: NextRequest,
	response: NextResponse,
) => {
	const supabase = createServerClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					for (const { name, value } of cookiesToSet) {
						request.cookies.set(name, value);
					}

					for (const { name, value, options } of cookiesToSet) {
						response.cookies.set(name, value, options);
					}
				},
			},
		},
	);

	// This is to ensure the session is updated
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return { response, user };
};
