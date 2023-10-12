import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Middleware Executed');

  const token = request.cookies.get('token')?.value;

  const loginPaths = [
     '/login/UserLogin',
     '/login/SetPassword'
  ];

  // Check if the user is logged in and trying to access a login-related path
  if (token && loginPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Continue processing for other routes
  return NextResponse.next();
}
