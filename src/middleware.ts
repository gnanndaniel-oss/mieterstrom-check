import { NextResponse } from 'next/navigation'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const basicAuth = req.headers.get('authorization')

    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1]
        const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':')

        const expectedUser = "admin"
        const expectedPassword = process.env.ADMIN_PASSWORD || "mieterstrom2026"

        if (user === expectedUser && pwd === expectedPassword) {
            return NextResponse.next()
        }
    }

    return new NextResponse('Basic Auth required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Admin Access"',
        },
    })
}

export const config = {
    matcher: '/admin/:path*',
}
