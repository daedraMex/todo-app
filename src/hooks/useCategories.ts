import { useQuery } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { useAuthStore } from '@/store/use-auth-store';

export const useCategories = () => {
  const token = useAuthStore((state) => state.token);

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => taskService.getCategories(token!),
    enabled: !!token,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  return { categories, isLoading, error };
};
