export interface Mission {
    id: number;
    content: string;
    order: number;
}

export interface School {
    id: number;
    name: string;
    vision: string;
    address: string;
    googleMapsUrl: string;
    phone: string;
    email: string;
    instagramUrl:string;
    videoUrl: string;
    missions: Mission[];
    createdAt: string;
    updatedAt: string;
}

export interface UpdateSchoolRequest {
    name?: string;
    vision?: string;
    address?: string;
    googleMapsUrl?: string;
    phone?: string;
    email?: string;
    instagramUrl?:string;
    videoUrl?: string;
    missions?: {
        content: string;
    }[];
}