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


export interface NewsSection {
  id: number;
  type: NewsSectionType;
  order: number;
  text: string | null;
  imageUrl: string | null;
  youtubeUrl: string | null;
}


export interface NewsDetail extends News {
  sections: NewsSection[];
}


export interface NewsListResponse {
  data: News[];

  meta: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
}