import { betterFetch } from "@better-fetch/fetch";
// import type { Session } from "better-auth";
import { getSessionCookie } from "better-auth/cookies";
import {
	type MiddlewareConfig,
	type NextRequest,
	NextResponse,
} from "next/server";
import type { auth } from "./lib/auth/auth";

const publicRoutes = ["/auth"];
type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const next = NextResponse.next();
	next.headers.set("x-pathname", pathname);

	// Skip auth API routes to prevent infinite loop
	if (pathname.startsWith("/api/auth") || publicRoutes.includes(pathname)) {
		return next;
	}

	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get("cookie") || "",
			},
		},
	);

	if (!session) {
		return NextResponse.redirect(
			new URL(`/auth?redirectUrl=${pathname}`, request.url),
		);
	}
	next.headers.set("x-user-id", session.user.id);

	return next;
}

export const config: MiddlewareConfig = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
