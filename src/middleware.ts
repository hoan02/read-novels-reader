import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/truyen(.*)", "/api(.*)", "/api/webhooks/:path"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
