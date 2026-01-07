import { Button } from '@/components/ui/button';;
import { FormField } from '@/components/molecules';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useLoginMutation } from '@/hooks/use-auth';
import { useState } from 'react';

export const LoginForm = () => {
  const { mutate, isPending, error: queryError } = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!email.trim()) return setValidationError('Ingresa tu correo electrónico');
    if (password.length < 6) return setValidationError('La contraseña debe tener al menos 6 caracteres');

    mutate({ email, password });
  };

  const displayError = validationError || (queryError as any)?.response?.data?.detail;

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
      <h2 className="font-display text-xl font-semibold mb-6 text-center">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Correo electrónico"
          icon={Mail}
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          disabled={isPending}
        />
        <FormField
          label="Contraseña"
          icon={Lock}
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          disabled={isPending}
        />

        {displayError && (
          <p className="text-sm text-destructive animate-fade-in text-center">
            {displayError === "Incorrect username or password" ? "Credenciales inválidas" : displayError}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Ingresando...</>
          ) : (
            'Ingresar'
          )}
        </Button>
      </form>
    </div>
  );
};