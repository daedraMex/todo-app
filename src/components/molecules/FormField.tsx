import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { LucideIcon } from 'lucide-react';

interface FormFieldProps {
  label: string;
  icon: LucideIcon;
  [key: string]: any; // Para pasar props nativas al Input
}

export const FormField = ({ label, icon: Icon, ...props }: FormFieldProps) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium">{label}</Label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input {...props} className={`pl-10 ${props.className}`} />
    </div>
  </div>
);