import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { deleteSession } from "./app/lib/session";

const protectedRoutes = ["/", "create-quote"];
const publicRoutes = ["/login"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("token")?.value;

  if (cookie) {
    const decoded = jwt.decode(cookie) as JWTTokenData;
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      deleteSession();
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && cookie) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|fonts|sw|workbox|manifest|ios|android|windows11).*)",
  ],
};
