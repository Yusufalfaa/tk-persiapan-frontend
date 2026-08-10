import type { LoginRequest } from "@/types/auth";

export async function login(request: LoginRequest) {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }
}

export async function getCurrentUser() {
    const response = await fetch("/api/auth/me", {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Unauthorized");
    }

    const result = await response.json();

    return result.data;
}