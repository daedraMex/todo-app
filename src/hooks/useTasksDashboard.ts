import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { taskService } from '@/services/task.service';
import { useAuthStore } from '@/store/use-auth-store';

export const useTasksDashboard = () => {
  const token = useAuthStore((state) => state.token);

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks', 'dashboard'],
    queryFn: () => taskService.getDashboardTasks(token!),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  const pendingTasks = useMemo(() =>
    tasks?.filter(t => t.is_completed === false) || [], [tasks]
  );

  const completedTasks = useMemo(() =>
    tasks?.filter(t => t.is_completed === true) || [], [tasks]
  );

  return { pendingTasks, completedTasks, isLoading };
};