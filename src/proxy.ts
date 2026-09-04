// proxy.ts
import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);

  headers.set('x-app-request-start', String(Date.now()));

  return NextResponse.next({
    request: { headers },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};