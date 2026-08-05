import api from "@/lib/axios";

export interface News {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  excerpt: string | null;
  createdAt: string;
}

export interface NewsSection {
  id: number;
  type: "TEXT" | "IMAGE" | "YOUTUBE";
  order: number;
  text: string | null;
  imagePath: string | null;
  youtubeUrl: string | null;
}

export interface NewsDetail extends News {
  sections: NewsSection[];
}


export async function getNews(): Promise<News[]> {
  const response = await api.get(
    "/api/news?page=1&size=3"
  );

  return response.data.data;
}


export async function getNewsDetail(
  slug: string
): Promise<NewsDetail> {

  const response = await api.get(
    `/api/news/${slug}`
  );

  return response.data.data;
}