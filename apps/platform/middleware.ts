import { getSessionCookie } from "better-auth/cookies";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth/auth";

const publicRoutes = ["/auth", "/api/auth/**"];

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const session = getSessionCookie(request);

	const next = NextResponse.next();
	next.headers.set("x-pathname", pathname);
	if (publicRoutes.includes(pathname)) {
		return next;
	}
	if (!session) {
		return NextResponse.redirect(
			new URL(`/auth?redirectUrl=${pathname}`, request.url),
		);
	}
	// next.headers.set("x-user-id", session.user.id);
	return next;
}

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
