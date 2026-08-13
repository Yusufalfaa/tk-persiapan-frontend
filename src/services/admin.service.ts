import api from "@/lib/axios";

import type {
    Admin,
    AdminListResponse,
    AdminDetailResponse,
    CreateAdminRequest,
    CreateAdminResponse,
    ResetAdminPasswordRequest,
    ResetAdminPasswordResponse,
} from "@/types/admin";

export async function getAdminList(page = 1, size = 10): Promise<AdminListResponse> {
    const response = await api.get<AdminListResponse>(
        "/api/admin",
        {
            params: {
                page,
                size,
            },
        }
    );

    return response.data;
}

export async function getAdmin(id: number): Promise<Admin> {
    const response =
        await api.get<AdminDetailResponse>(
            `/api/admin/${id}`
        );

    return response.data.data;
}

export async function createAdmin(request: CreateAdminRequest): Promise<Admin> {
    const response =
        await api.post<CreateAdminResponse>(
            "/api/admin",
            request
        );

    return response.data.data;
}

export async function resetAdminPassword(
    id: number,
    request: ResetAdminPasswordRequest
): Promise<ResetAdminPasswordResponse> {
    const response =
        await api.patch<ResetAdminPasswordResponse>(
            `/api/admin/${id}/reset-password`,
            request
        );

    return response.data;
}

export async function deleteAdmin(id: number): Promise<{ message: string }> {
    const response =
        await api.delete<{ message: string }>(
            `/api/admin/${id}`
        );

    return response.data;
}
