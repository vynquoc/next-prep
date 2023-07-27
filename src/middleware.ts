import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");
    const user = req.nextauth.token;
    if (isAuthPage) {
      if (user) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (user?.role !== "admin")
        return new NextResponse("You are not allowed");
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
