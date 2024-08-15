import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher([
    '/',
    '/admin',
    '/mentees/[userId]/appointment',
    '/mentees/[userId]/appointment/success?appointmentId=[appointmentId]',
    '/meeting(.*)'
])
 
export default clerkMiddleware((auth, req) => {
    if(protectedRoutes(req)) auth().protect();
});
 
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};