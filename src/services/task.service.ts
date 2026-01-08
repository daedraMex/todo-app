import type { PaginatedTaskResponse, TaskResponse, CategorieResponse, CategorieListResponse } from '@/types/task';
import { api } from '@/services/api';

export const taskService = {
  getCategories: async (token: string): Promise<CategorieResponse[]> => {
    const { data } = await api.get<CategorieListResponse>('/categories', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data.categories;
  },
  create: async (task: { title: string; description?: string; category_id: number; status?: string }, token: string): Promise<TaskResponse> => {
    const { data } = await api.post<TaskResponse>(
      '/tasks',
      {
        title: task.title,
        description: task.description || null,
        category_id: task.category_id,
        status: task.status || 'pending'
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  getDashboardTasks: async (token: string, page = 1, perPage = 50) => {
    const {data} = await api.get<PaginatedTaskResponse>('/tasks', {
      params: {
        per_page: perPage,
        page: page,
        order_by: 'created_at',
        direction: 'asc'
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('getDashboardTasks - API response:', data);
    console.log('getDashboardTasks - tasks array:', data.tasks);
    return data.tasks;
  },
  update: async (taskId: number, task: TaskResponse, token: string): Promise<TaskResponse> => {
    const { data } = await api.put<TaskResponse>(
      `/tasks/${taskId}`,
      {
        title: task.title,
        description: task.description || null,
        is_completed: task.is_completed,
        category_id: task.category_id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data;
  },
  delete: async (taskId: number, token: string): Promise<void> => {
    await api.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};