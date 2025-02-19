import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);


export default auth((req) => {
  // console.log(req.auth);
  // console.log(req.nextUrl);

  console.log('MIDDLEWARE ', req.nextUrl.pathname);

  // Rutas públicas
  // if (req.nextUrl.pathname.startsWith('/about')) return null


  // Rutas privadas
  if (!req.auth) {
    console.log("no autenticado");

    let callbackUrl = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      callbackUrl += req.nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      req.nextUrl.origin + `/auth/login?callbackUrl=${encodedCallbackUrl}`
    );
  }
});



// export const config = {
//   matcher: [
//     // // rutas públicas: las incluimos para no perder la sesión
//     // '/about',

//     // rutas de admin
//     '/admin(.*)',

//     // rutas de user
//     '/dashboard(.*)',
//     '/proyectos(.*)',
//     '/recintos(.*)',
//     '/equipos(.*)'
//   ]
// };


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|pwa|auth|about|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}