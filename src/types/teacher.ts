export interface Teacher {
  id: number;
  name: string;
  position: string;
  photoUrl: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeacherRequest {
    name: string;
    position: string;
    order?: number;
    photo?: File;
}

export interface UpdateTeacherRequest {
    name: string;
    position: string;
    order?: number;
    photo?: File;
}

export interface TeacherPagination {
  page: number;
  size: number;
  total: number;
  totalPages: number;
}


export interface TeacherListResponse {
  data: Teacher[];
  meta: TeacherPagination;
}