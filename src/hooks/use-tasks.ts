import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/use-auth-store';

// Interfaz sincronizada con tu modelo de FastAPI
export interface Task {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
}

export const useTasks = () => {
  const token = useAuthStore((state) => state.token);

  // Query para obtener tareas
  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<Task[]> => {
      const response = await fetch('/api/v1/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Network error');
      return response.json();
    },
    enabled: !!token, // Solo se ejecuta si hay un token
  });

  return { tasksQuery };
};