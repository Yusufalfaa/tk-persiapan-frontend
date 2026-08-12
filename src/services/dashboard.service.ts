import api from "@/lib/axios";
import type { DashboardStat } from "@/types/dashboard";

interface DashboardStatsResponse {
    data: DashboardStat;
}

export async function getDashboardStats(): Promise<DashboardStat> {
    const response = await api.get<DashboardStatsResponse>(
        "/api/admin/dashboard/stats"
    );

    return response.data.data;
}