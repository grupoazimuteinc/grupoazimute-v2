import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isDashboardRoute = createRouteMatcher(['/dashboard(.*)'])

const isPublicDashboardRoute = createRouteMatcher([
  '/dashboard/tools/assinaturas/(.*)/html',
])

const isPublicAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware((auth, request) => {
  if (isPublicAuthRoute(request)) {
    return
  }

  if (isDashboardRoute(request) && !isPublicDashboardRoute(request)) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/:path*',
  ],
}
