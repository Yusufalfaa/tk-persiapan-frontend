export type NewsSectionType =
    | "TEXT"
    | "IMAGE"
    | "YOUTUBE";

export interface NewsList {
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
    data: NewsList[];
    meta: PaginationMeta;
}

export interface NewsSection {
    id: number;
    type: NewsSectionType;
    order: number;
    text: string | null;
    imageUrl: string | null;
    youtubeUrl: string | null;
}

export interface NewsDetail extends NewsList {
    sections: NewsSection[];
}