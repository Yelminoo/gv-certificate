import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('admin_auth')?.value === 'true'
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')
  const isLogin = request.nextUrl.pathname.startsWith('/login')

  if (isDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (isLogin && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/login'],
}
