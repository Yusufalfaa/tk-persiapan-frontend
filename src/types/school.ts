export interface Mission {
  id: number;
  content: string;
  order: number;
}


export interface SchoolProfile {
  id: number;
  name: string;

  vision: string;
  missions: Mission[];

  address: string;

  latitude: number;
  longitude: number;

  googleMapsUrl: string;

  phone: string;
  email: string;
  instagramUrl: string | null;

  videoUrl: string | null;

  createdAt: string;
  updatedAt: string;
}