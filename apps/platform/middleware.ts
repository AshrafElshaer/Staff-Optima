import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const sessionCookie = getSessionCookie(request); // Optionally pass config as the second argument if cookie name or prefix is customized.
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/auth", request.url));
	}
	return NextResponse.next({
		...request,
		headers: {
			...request.headers,
			"x-pathname": pathname,
		},
	});
}

export const config = {
	matcher: ["/dashboard"], // Specify the routes the middleware applies to
};
