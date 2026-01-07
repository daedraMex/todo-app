import { useState } from 'react';
import { useAuthStore } from '@/store/use-auth-store';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { FormField } from '@/components/molecules';

export const LoginForm = () => {
  const { setAuth, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) return setError('Ingresa tu correo electrónico');
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres');

    // Simular login exitoso (reemplaza con tu llamada API real)
    setAuth({ id: 1, username: email.split('@')[0], email, role: 'user' }, 'fake-token-123');
  };

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
      <h2 className="font-display text-xl font-semibold mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField 
          label="Correo electrónico" 
          icon={Mail} 
          type="email" 
          placeholder="tu@email.com" 
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <FormField 
          label="Contraseña" 
          icon={Lock} 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-destructive animate-fade-in">{error}</p>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Ingresando...</> : 'Ingresar'}
        </Button>
      </form>
    </div>
  );
};