import axios from 'axios';
import type { User } from '@/types/auth';

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User; 
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    const { data } = await axios.post<LoginResponse>(
      `${import.meta.env.VITE_API_URL}/auth/login`, 
      params
    );
    return data;
  }
};