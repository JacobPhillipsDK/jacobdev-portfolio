// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Add extensive logging
    console.log('=====================================');
    console.log('Middleware Execution Started');
    console.log('Request URL:', request.url);
    console.log('Hostname:', request.headers.get('host'));
    console.log('Method:', request.method);
    console.log('Environment:', process.env.NODE_ENV);

    const url = request.nextUrl;
    const hostname = request.headers.get('host') || '';

    // Check if the hostname contains a subdomain
    if (hostname && hostname.includes('.localhost')) {
        console.log('Subdomain detected - Redirecting to 404');
        // Redirect to /404
        return NextResponse.redirect(new URL('/404', request.url));
    }

    console.log('No subdomain detected - Continuing');
    console.log('=====================================');
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)', // Match non-subdomain URLs
        '/:subdomain((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)', // Match subdomains
    ],
};
