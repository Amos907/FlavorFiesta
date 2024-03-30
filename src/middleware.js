import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

export async function middleware(request) {
  console.log("Running Middleware!");
  const token = request.cookies.get("jwt");
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const decodedToken = Jwt.verify(token.value, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      // Check for specific error type
      console.log("JsonWebTokenError");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      // Handle other potential errors here (optional)
      console.error("Unexpected error:", err);
      return NextResponse.next(); // Or handle differently based on error
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  ],
};
