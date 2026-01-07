import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/use-auth-store';

export const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/tasks" replace />;
  }

  return <Outlet />;
};