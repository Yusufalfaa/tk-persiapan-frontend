import api from "@/lib/axios";

import type {
    CurrentUser,
    LoginRequest,
    LoginResponse,
    UpdateCurrentUserRequest,
} from "@/types/auth";


export async function login(request: LoginRequest) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
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

    const result: { data: LoginResponse } = await response.json();

    localStorage.setItem(
        "accessToken",
        result.data.accessToken
    );

    return result.data;
}

export async function getCurrentUser(): Promise<CurrentUser> {
    const response = await api.get<{ data: CurrentUser }>(
        "/api/auth/me"
    );

    return response.data.data;
}

export async function updateCurrentUser(request: UpdateCurrentUserRequest): Promise<CurrentUser> {
    const response = await api.put<{ data: CurrentUser }>(
        "/api/auth/me",
        request
    );

    return response.data.data;
}

export async function logout() {
    localStorage.removeItem("accessToken");
}