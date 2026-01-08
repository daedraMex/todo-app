import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { taskService } from '@/services/task.service';
import { useAuthStore } from '@/store/use-auth-store';

export const useTasksDashboard = () => {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks', 'dashboard'],
    queryFn: () => taskService.getDashboardTasks(token!),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  const toggleCompleteMutation = useMutation({
    mutationFn: ({ taskId, isCompleted }: { taskId: number; isCompleted: boolean }) =>
      taskService.toggleComplete(taskId, isCompleted, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', 'dashboard'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId: number) => taskService.delete(taskId, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', 'dashboard'] });
    },
  });

  const pendingTasks = useMemo(() =>
    tasks?.filter(t => t.is_completed === false) || [], [tasks]
  );

  const completedTasks = useMemo(() =>
    tasks?.filter(t => t.is_completed === true) || [], [tasks]
  );

  const handleToggleComplete = (taskId: number, isCompleted: boolean) => {
    toggleCompleteMutation.mutate({ taskId, isCompleted });
  };

  const handleDelete = (taskId: number) => {
    deleteMutation.mutate(taskId);
  };

  return {
    pendingTasks,
    completedTasks,
    isLoading,
    handleToggleComplete,
    handleDelete,
  };
};