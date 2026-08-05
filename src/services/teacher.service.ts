import api from "@/lib/axios";

export interface Teacher {
  id: number;
  name: string;
  position: string;
  photoPath: string | null;
}

export async function getTeachers() {
  const response = await api.get("/api/teachers");

  return response.data.data;
}