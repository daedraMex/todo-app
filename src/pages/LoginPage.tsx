import { Logo } from '@/components/molecules';
import { LoginForm } from '@/components/organisms';
import { AuthTemplate } from '@/components/templates';

export default function LoginPage() {
  return (
    <AuthTemplate 
      header={<Logo />}
      content={<LoginForm />}
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Ingresa cualquier email y contraseña (mín. 6 caracteres)
        </p>
      }
    />
  );
}