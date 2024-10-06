import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readPayloadJose } from "./lib/jwt";

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (pathname === "/" || pathname === "/create-challenge") {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();

  // if (request.url.includes("/api/follow")) {
  //   const cookiesStore = cookies();
  //   const token = cookiesStore.get("token");

  //   if (!token) {
  //     return NextResponse.json({
  //       statusCode: 401,
  //       error: "Unauthorized",
  //     });
  //   }

  //   const tokenData = await readPayloadJose<{ id: string; email: string }>(
  //     token.value
  //   );
  //   const requestHeaders = new Headers(request.headers);
  //   requestHeaders.set("x-user-id", tokenData.id);
  //   requestHeaders.set("x-user-email", tokenData.email);

  //   return NextResponse.next({
  //     headers: requestHeaders,
  //   });
  // }
};
