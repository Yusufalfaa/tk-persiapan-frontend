import api from "@/lib/axios";
import type {
    CreateNewsRequest,
    NewsDetail,
    NewsListResponse,
    UpdateNewsRequest,
    AdminNewsDetail,
    CreateSectionRequest,
    NewsSection,
    UpdateSectionRequest,
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
    const response = await api.get<NewsListResponse>(
        `/api/admin/news?page=${page}&size=${size}`
    );

    return response.data;
}

export async function getAdminNewsDetail(id: number): Promise<AdminNewsDetail> {
    const response = await api.get<{
        data: AdminNewsDetail;
    }>(`/api/admin/news/${id}`);

    return response.data.data;
}

export async function createNews(request: CreateNewsRequest): Promise<NewsDetail> {
    const response = await api.post<{
        data: NewsDetail;
    }>("/api/admin/news", request);

    return response.data.data;
}

export async function updateNews(id: number, request: UpdateNewsRequest): Promise<NewsDetail> {
    const response = await api.patch<{
        data: NewsDetail;
    }>(`/api/admin/news/${id}`, request);

    return response.data.data;
}

export async function deleteNews(id: number): Promise<void> {
    await api.delete(`/api/admin/news/${id}`);
}

// NEWS SECTION

export async function createNewsSection(
    newsId: number,
    request: CreateSectionRequest,
): Promise<void> {
    const formData = new FormData();

    formData.append("type", request.type);

    if (request.text !== undefined) {
        formData.append("text", request.text);
    }

    if (request.youtubeUrl !== undefined) {
        formData.append(
            "youtubeUrl",
            request.youtubeUrl
        );
    }

    if (request.image) {
        formData.append(
            "image",
            request.image
        );
    }

    await api.post(
        `/api/admin/news/${newsId}/sections`,
        formData
    );
}

export async function updateNewsSection(
    sectionId: number,
    request: UpdateSectionRequest,
): Promise<void> {
    const formData = new FormData();

    if (request.text !== undefined) {
        formData.append("text", request.text);
    }

    if (request.youtubeUrl !== undefined) {
        formData.append(
            "youtubeUrl",
            request.youtubeUrl
        );
    }

    if (request.image !== undefined) {
        formData.append("image", request.image);
    }

    await api.patch(
        `/api/admin/news/sections/${sectionId}`,
        formData
    );
}

export async function deleteNewsSection(sectionId: number): Promise<void> {
    await api.delete(
        `/api/admin/news/sections/${sectionId}`
    );
}

export async function reorderNewsSection(sectionId: number, direction: "UP" | "DOWN"): Promise<void> {
    await api.patch(
        `/api/admin/news/sections/${sectionId}/move`,
        {
            direction,
        }
    );
}
