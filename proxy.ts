import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STAFF_COOKIE, verifyStaffSessionToken } from "@/lib/staff-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/staff")) {
    return NextResponse.next();
  }

  if (pathname === "/staff/login") {
    const session = verifyStaffSessionToken(request.cookies.get(STAFF_COOKIE)?.value);
    if (session) {
      return NextResponse.redirect(new URL("/staff", request.url));
    }
    return NextResponse.next();
  }

  const session = verifyStaffSessionToken(request.cookies.get(STAFF_COOKIE)?.value);
  if (!session) {
    const login = new URL("/staff/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/staff", "/staff/:path*"],
};
