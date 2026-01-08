import {  ClipboardList } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';


interface EmptyStateProps {
  message: string;
  description?: string;
  icon?: LucideIcon;
}

export const EmptyState = ({ 
  message, 
  description, 
  icon: Icon = ClipboardList 
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl border-2 border-dashed border-border bg-card/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
        <Icon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground">
        {message}
      </h3>
      
      {description && (
        <p className="mt-1 text-sm text-muted-foreground max-w-[250px]">
          {description}
        </p>
      )}
    </div>
  );
};