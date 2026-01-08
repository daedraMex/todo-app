import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { useAuthStore } from '@/store/use-auth-store';

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: (newTask: { title: string; description: string }) => 
      taskService.create(newTask, token!),
    onSuccess: () => {
      // Invalidamos el caché para refrescar la lista de tareas instantáneamente
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};