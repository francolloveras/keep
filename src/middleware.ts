import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { LOCALES } from '@/lib/const'

function getLocale(request: Request) {
  const headers: Record<string, string> = {}
  request.headers.forEach((value, key) => (headers[key] = value))

  const languages = new Negotiator({ headers }).languages()
  const defaultLocale = 'en'

  return match(languages, LOCALES, defaultLocale)
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Ignore files in public.
  if (['/flags/es.svg', '/flags/uk.svg'].includes(pathname)) return

  // Check if there is any supported locale in the pathname.
  const pathnameIsMissingLocale = LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale.
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }

  // Update the session cookie only in GET request.
  if (request.method === 'GET') {
    const response = NextResponse.next()
    const token = request.cookies.get('session')?.value ?? null

    if (token !== null) {
      response.cookies.set('session', token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      })
    }

    return response
  }

  // Cross-site request forgery (CSRF) protection
  if (request.method === 'GET') {
    return NextResponse.next()
  }

  const originHeader = request.headers.get('Origin')
  const hostHeader = request.headers.get('Host')

  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, {
      status: 403
    })
  }

  let origin: URL

  try {
    origin = new URL(originHeader)
  } catch {
    return new NextResponse(null, {
      status: 403
    })
  }

  if (origin.host !== hostHeader) {
    return new NextResponse(null, {
      status: 403
    })
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
