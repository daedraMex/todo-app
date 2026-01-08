import { useAuth } from '@/hooks/use-auth';
import { CreateTaskDialog } from '@/components/organisms/CreateTaskDialog';
import { Button } from '@/components/ui/button';
import { LogOut, CheckSquare } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            TaskFlow
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <CreateTaskDialog />
          
          <span className="text-sm text-muted-foreground">
            {user?.name}
          </span>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={logout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
