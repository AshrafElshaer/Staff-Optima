import { authSearchParamsSerializer } from "@/features/auth/auth-search-params";
import {
	type MiddlewareConfig,
	type NextRequest,
	NextResponse,
} from "next/server";
import { updateSession } from "./lib/supabase/middleware";

const publicRoutes = ["/auth"];

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const next = NextResponse.next();
	next.headers.set("x-pathname", pathname);

	// Skip auth API routes to prevent infinite loop
	if (pathname.startsWith("/api") || publicRoutes.includes(pathname)) {
		return next;
	}

	const { response, user } = await updateSession(request, next);

	if (!user) {
		return NextResponse.redirect(
			new URL(
				`/auth${authSearchParamsSerializer({
					redirect_url: pathname,
					active_tab: "sign-in",
				})}`,
				request.url,
			),
		);
	}
	response.headers.set("x-user-id", user.id);
	response.headers.set("x-company-id", user?.user_metadata.company_id ?? "");

	return response;
}

export const config: MiddlewareConfig = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
