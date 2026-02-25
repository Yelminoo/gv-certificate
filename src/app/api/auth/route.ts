import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'admin'

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const res = NextResponse.json({ success: true })
    res.cookies.set('admin_auth', 'true', { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 })
    return res
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
