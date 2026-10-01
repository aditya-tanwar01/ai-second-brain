import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },

                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => {
                        request.cookies.set(name, value);
                    });

                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });

                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;

    const protectedRoutes = [
        "/dashboard",
        "/notes",
        "/tasks",
        "/ai",
    ];

    const isProtectedRoute = protectedRoutes.some(
        (route) =>
            pathname === route || pathname.startsWith(`${route}/`)
    );

    if (isProtectedRoute && !user) {
        const loginUrl = request.nextUrl.clone();

        loginUrl.pathname = "/login";

        return NextResponse.redirect(loginUrl);
    }

    return response;
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/notes/:path*",
        "/tasks/:path*",
        "/ai/:path*",
    ],
};