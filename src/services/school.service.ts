import api from "@/lib/axios";
import type { SchoolProfile } from "@/types/school";


export async function getSchoolProfile(): Promise<SchoolProfile> {
    const response = await api.get<{data: SchoolProfile;}>(
        "/api/school"
    );

    return response.data.data;
}