import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/use-auth-store';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  // Mientras el AuthProvider verifica el token, mostramos un estado neutro
  if (isLoading) return <div>Cargando...</div>; 

  if (!isAuthenticated) {
    // Guardamos la ubicación actual para redirigir después del login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // Renderiza las rutas hijas si está autenticado
};