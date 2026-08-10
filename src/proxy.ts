import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;

    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith("/admin") &&
        pathname !== "/admin/login"
    ) {
        if (!accessToken) {
            return NextResponse.redirect(
                new URL("/admin/login", request.url)
            );
        }
    }

    if (pathname === "/admin/login" && accessToken) {
        return NextResponse.redirect(
            new URL("/admin", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};