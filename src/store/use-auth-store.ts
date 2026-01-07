import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User } from '@/types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user: User, token: string) => 
        set({ user, token, isAuthenticated: true, isLoading: false }),

      logout: () => 
        set({ user: null, token: null, isAuthenticated: false }),

      setLoading: (loading: boolean) => 
        set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage', 
    }
  )
);