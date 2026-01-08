import axios from 'axios';
import type{ Task } from '@/hooks/use-tasks';

export const taskService = {
  create: async (task: { title: string; description: string }, token: string): Promise<Task> => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/tasks/`, 
      task,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }
};