import api from "@/lib/axios";
import type {
  CreateTeacherRequest,
  UpdateTeacherRequest,
  Teacher,
  TeacherListResponse
} from "@/types/teacher";

export async function getTeachers(page = 1, size = 10): Promise<TeacherListResponse> {
  const response = await api.get<TeacherListResponse>(
    "/api/teachers",
    {
        params: {
            page,
            size,
        },
    }
  );

  return response.data;
}

export async function getAdminTeacher(id: number): Promise<Teacher> {
    const response = await api.get<{ data: Teacher }>(
        `/api/admin/teachers/${id}`
    );

    return response.data.data;
}

export async function createTeacher(request: CreateTeacherRequest): Promise<Teacher> {
    const formData = new FormData();

    formData.append("name", request.name);
    formData.append("position", request.position);

    if (request.order !== undefined) {
        formData.append("order", String(request.order));
    }

    if (request.photo) {
        formData.append("photo", request.photo);
    }

    const response = await api.post<{ data: Teacher }>(
        "/api/admin/teachers",
        formData
    );

    return response.data.data;
}

export async function updateTeacher(id: number, request: UpdateTeacherRequest): Promise<Teacher> {
    const formData = new FormData();

    formData.append("name", request.name);
    formData.append("position", request.position);

    if (request.order !== undefined) {
        formData.append(
            "order",
            String(request.order)
        );
    }

    if (request.photo) {
        formData.append("photo", request.photo);
    }

    const response = await api.patch<{ data: Teacher }>(
        `/api/admin/teachers/${id}`,
        formData
    );

    return response.data.data;
}

export async function deleteTeacher(id: number): Promise<void> {
    await api.delete(`/api/admin/teachers/${id}`);
}