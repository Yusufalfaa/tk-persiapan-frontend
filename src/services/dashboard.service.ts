import type { DashboardStat } from "@/types/dashboard";

interface DashboardStatsResponse {
    data: DashboardStat;
}

export async function getDashboardStats(): Promise<DashboardStat> {
    const response = await fetch(
        "/api/admin/dashboard/stats",
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to load dashboard stats");
    }

    const result: DashboardStatsResponse =
        await response.json();

    return result.data;
}