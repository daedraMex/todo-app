import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '@/services/auth-service';
import { useAuthStore } from '@/store/use-auth-store';

export const useLoginMutation = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtenemos la ruta previa si existe, o vamos a /tasks
  const from = location.state?.from?.pathname || '/tasks';

  return useMutation({
    mutationFn: ({ email, password }: any) => authService.login(email, password),
    onSuccess: (data) => {
      setAuth(data.user, data.access_token);
      navigate(from, { replace: true });
    },
    onError: (error: any) => {
      console.error('Error de autenticación:', error.response?.data?.detail);
    }
  });
};
export const useAuth = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuthStore();
  return { user, isAuthenticated, logout, isLoading };
};