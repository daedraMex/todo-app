import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { useAuthStore } from '@/store/use-auth-store';

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: (newTask: { title: string; description?: string; category_id: number; is_completed?: boolean }) =>
      taskService.create(newTask, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', 'dashboard'] });
    },
  });
};