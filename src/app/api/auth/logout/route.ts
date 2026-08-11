import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
        return NextResponse.json(
            {
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        return NextResponse.json(result, {
            status: response.status,
        });
    }

    const res = NextResponse.json(result, {
        status: response.status,
    });

    res.cookies.delete("accessToken");

    return res;
}