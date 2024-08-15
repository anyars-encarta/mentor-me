import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher([
    '/',
    '/admin',
    '/mentees/[userId]/appointment',
    '/mentees/[userId]/new-appointment',
    '/mentees/[userId]/appointment/success',
    '/meeting(.*)',
])
 
export default clerkMiddleware((auth, req) => {
    if(protectedRoutes(req)) auth().protect();
});
 
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};