export type AdminRole =
    | "ADMIN"
    | "SUPER_ADMIN";

export interface Admin {
    id: number;
    username: string;
    name: string;
    role: AdminRole;
    createdAt: string;
    updatedAt: string;
}

export interface AdminListMeta {
    page: number;
    size: number;
    total: number;
    totalPages: number;
}

export interface AdminListResponse {
    data: Admin[];
    meta: AdminListMeta;
}

export interface AdminDetailResponse {
    data: Admin;
}

export interface CreateAdminRequest {
    username: string;
    password: string;
    name: string;
}

export interface CreateAdminResponse {
    data: Admin;
}

export interface ResetAdminPasswordRequest {
    newPassword: string;
}

export interface ResetAdminPasswordResponse {
    message: string;
}

