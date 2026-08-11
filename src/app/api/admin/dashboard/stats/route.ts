import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard/stats`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    const result = await response.json();

    return NextResponse.json(result, {
        status: response.status,
    });
}