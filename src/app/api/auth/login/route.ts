import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      result,
      {
        status: response.status,
      }
    );
  }


  const res = NextResponse.json({
    data: {
      message: "Login success",
    },
  });


  res.cookies.set(
    "accessToken",
    result.data.accessToken,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 4,
    }
  );


  return res;
}