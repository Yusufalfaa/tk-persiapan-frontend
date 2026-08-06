import api from "@/lib/axios";
import type {
  News,
  NewsDetail,
  NewsListResponse
} from "@/types/news";

export async function getNews(page = 1, size = 3): Promise<NewsListResponse> {
  const response = await api.get<NewsListResponse>(
    `/api/news?page=${page}&size=${size}`
  );

  return response.data;
}

export async function getNewsDetail(slug: string): Promise<NewsDetail> {
  const response = await api.get<{data: NewsDetail;}>(
    `/api/news/${slug}`
  );

  return response.data.data;
}