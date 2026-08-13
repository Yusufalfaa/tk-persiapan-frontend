export type NewsSectionType =
    | "TEXT"
    | "IMAGE"
    | "YOUTUBE";

export interface NewsAuthor {
    id: number;
    name: string;
}

export interface NewsList {
    id: number;
    title: string;
    slug: string;
    thumbnailUrl: string | null;
    excerpt: string | null;
    isPublished: boolean;
    author: NewsAuthor | null;
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

export interface NewsDetail {
    id: number;
    title: string;
    slug: string;
    isPublished: boolean;
    author: NewsAuthor | null;
    sections: NewsSection[];
    createdAt: string;
    updatedAt: string;
}

export interface AdminNewsDetail extends NewsDetail {
    sectionCount: number;
    canAddSection: boolean;
}

export type CreateNewsRequest = {
    title: string;
};

export type UpdateNewsRequest = {
    title?: string;
    isPublished?: boolean;
};

export type CreateSectionRequest = {
    type: NewsSectionType;
    text?: string;
    youtubeUrl?: string;
    image?: File;
};

export type UpdateSectionRequest = {
    text?: string;
    youtubeUrl?: string;
    image?: File;
};

export type SectionMoveDirection =
    | "UP"
    | "DOWN";

export type ReorderSectionRequest = {
    direction: SectionMoveDirection;
};

