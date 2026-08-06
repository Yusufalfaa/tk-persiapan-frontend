export type NewsSectionType =
  | "TEXT"
  | "IMAGE"
  | "YOUTUBE";


export interface News {
  id: number;
  title: string;
  slug: string;
  thumbnailUrl: string | null;
  excerpt: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface PaginationMeta {
  page: number;
  size: number;
  total: number;
  totalPages: number;
}


export interface NewsListResponse {
  data: News[];
  meta: PaginationMeta;
}


export interface NewsSection {
  id: number;
  type: "TEXT" | "IMAGE" | "YOUTUBE";
  order: number;
  text: string | null;
  imageUrl: string | null;
  youtubeUrl: string | null;
}


export interface NewsDetail extends News {
  sections: NewsSection[];
}