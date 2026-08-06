import type { LoginRequest } from "@/types/auth";

export async function login(request: LoginRequest): Promise<void> {
    const response = await fetch(
        "/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        }
    );

    if (!response.ok) {
        throw new Error("Login failed");
    }
}