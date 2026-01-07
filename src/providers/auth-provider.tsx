import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuthStore } from '@/store/use-auth-store';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { token, logout, setLoading } = useAuthStore();

  useEffect(() => {
    const checkSession = async () => {
      if (!token) return;

      setLoading(true);
      try {
        // Aquí llamarías a tu endpoint GET /me que protegimos
        // const user = await authService.verifyToken(token);
      } catch {
        logout(); // Token expirado o inválido
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [token, logout, setLoading]);

  return <>{children}</>;
};