import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { taskService } from '@/services/task.service';
import { useAuthStore } from '@/store/use-auth-store';
import type { TaskResponse } from '@/types/task';
import { CloudOff } from 'lucide-react';

export const useTasksDashboard = () => {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks', 'dashboard'],
    queryFn: () => taskService.getDashboardTasks(token!),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  console.log('useTasksDashboard - tasks:', tasks, 'isLoading:', isLoading, 'error:', error);

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, updatedTask }: { taskId: number; updatedTask: TaskResponse }) =>
      taskService.update(taskId, updatedTask, token!),
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
    tasks?.filter(t => t.is_completed === false ) || [], [tasks]
  );

  const completedTasks = useMemo(() =>
    tasks?.filter(t => t.is_completed === true) || [], [tasks]
  );

  const handleToggleComplete = (taskId: number, isCompleted: boolean) => {
    console.log(isCompleted)
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedTask: TaskResponse = {
      ...task,
      is_completed: isCompleted
    }

    updateTaskMutation.mutate({ taskId, updatedTask });
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