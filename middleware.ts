export { auth as middleware } from "@/auth";
export const config = {
  matcher: [
    "/((?!onboarding|signup|api|_next/static|_next/image|fonts|favicon.ico|logo.svg|$).*)",
  ],
};
// import { auth } from "@/auth";

// export default auth((req) => {
//   if (!req.auth && req.nextUrl.pathname !== "/onboarding") {
//     const newUrl = new URL("/onboarding", req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
// });
