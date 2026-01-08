import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/use-auth-store';

export interface Task {
  created_at: string | number | Date;
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
}

export const useTasks = () => {
  const token = useAuthStore((state) => state.token);

  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<Task[]> => {
      const response = await fetch('/api/v1/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Network error');
      return response.json();
    },
    //Sie ncuentra un token, se dispatch
    enabled: !!token, 
  });

  return { tasksQuery };
};