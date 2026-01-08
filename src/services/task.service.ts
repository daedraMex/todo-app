import axios from 'axios';
import type { PaginatedTaskResponse, TaskResponse } from '@/types/task';;
import { api} from '@/services/api';

export const taskService = {
  create: async (task: { title: string; description: string }, token: string): Promise<Task> => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/tasks`,
      task,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  getDashboardTasks: async (token: string, page = 1, perPage = 6) => {
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
    return data.tasks;
  },
  toggleComplete: async (taskId: number, isCompleted: boolean, token: string): Promise<TaskResponse> => {
    const { data } = await api.patch<TaskResponse>(
      `/tasks/${taskId}`,
      { is_completed: isCompleted },
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