import api from "@/lib/axios";
import type {
    NewsDetail,
    NewsListResponse,
} from "@/types/news";

export async function getNews(page = 1, size = 3): Promise<NewsListResponse> {
    const response = await api.get<NewsListResponse>(
        `/api/news?page=${page}&size=${size}`
    );

    return response.data;
}

export async function getNewsDetail(slug: string): Promise<NewsDetail> {
    const response = await api.get<{
        data: NewsDetail;
    }>(`/api/news/${slug}`);

    return response.data.data;
}

export async function getAdminNews(page = 1, size = 10): Promise<NewsListResponse> {
    const response = await fetch(
        `/api/admin/news?page=${page}&size=${size}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to load admin news");
    }

    return response.json();
}

export async function getAdminNewsDetail(id: number): Promise<NewsDetail> {
    const response = await fetch(
        `/api/admin/news/${id}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to load admin news detail"
        );
    }

    const result: {
        data: NewsDetail;
    } = await response.json();

    return result.data;
}