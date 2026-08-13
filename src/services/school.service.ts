import api from "@/lib/axios";

import type {
    School,
    UpdateSchoolRequest,
} from "@/types/school";

export async function getSchool(): Promise<School> {
    const response = await api.get<{ data: School }>(
        "/api/school"
    );

    return response.data.data;
}

export async function updateSchool(
    request: UpdateSchoolRequest
): Promise<School> {
    const response = await api.put<{ data: School }>(
        "/api/admin/school",
        request
    );

    return response.data.data;
}