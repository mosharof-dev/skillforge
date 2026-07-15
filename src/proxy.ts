import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the routes that require authentication
const privateRoutes = ["/courses/manage", "/courses/add", "/courses/edit"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the current path starts with any of the private routes
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (isPrivateRoute) {
    // better-auth uses 'better-auth.session_token' or its secure variant
    const sessionToken = request.cookies.get("better-auth.session_token")?.value || 
                         request.cookies.get("__Secure-better-auth.session_token")?.value;

    // If there is no valid JWT/Session token, redirect to the login page
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      // Optional: Save the attempted URL to redirect back after login
      // loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow access to the route if authenticated or if it's a public route
  return NextResponse.next();
}

export const config = {
  // Match all routes except API, static files, and images
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
