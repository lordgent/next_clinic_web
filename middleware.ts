import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    // if (token && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
    //     return NextResponse.redirect(new URL('/user/home', req.url)); 
    // }

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const res = await fetch('http://185.170.198.166:8000/api/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        const data = await res.json();
        const userRole = data?.data?.role;

        if (req.nextUrl.pathname.startsWith('/admin') && userRole !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        if (req.nextUrl.pathname.startsWith('/user') && userRole !== 'user') {
            return NextResponse.redirect(new URL('/', req.url));
        }

    } catch (error) {
        console.error('Middleware Error:', error);
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*'],
};
