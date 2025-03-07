import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/auth", "/api/auth/**"];

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const sessionCookie = getSessionCookie(request); // Optionally pass config as the second argument if cookie name or prefix is customized.

	const next = NextResponse.next();
	next.headers.set("x-pathname", pathname);
	if (publicRoutes.includes(pathname)) {
		return next;
	}
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/auth", request.url));
	}
	return next;
}

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
