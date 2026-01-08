export type TaskStatus = 'pending' | 'completed';

export interface CategorieResponse {
  id: number;
  name: string;
}

export interface TaskResponse {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  color: string;
  user_id: number;
  categorie_id: number;
  created_at: string;
  updated_at: string;
  is_completed: boolean;
  category?: CategorieResponse;
}

export interface PaginatedTaskResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_prev: boolean;
  has_next: boolean;
  order_by: 'id';
  direction: 'asc' | 'desc';
  query: string | null;
  tasks: TaskResponse[];
}