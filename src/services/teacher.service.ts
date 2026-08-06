import api from "@/lib/axios";
import type {
  Teacher,
  TeacherListResponse
} from "@/types/teacher";

export async function getTeachers(): Promise<Teacher[]> {
  const response = await api.get<TeacherListResponse>(
    "/api/teachers"
  );

  return response.data.data;
}