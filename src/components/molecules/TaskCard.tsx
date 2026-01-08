import type { TaskResponse } from '@/types/task';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Trash2, Circle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface TaskCardProps {
  task: TaskResponse;
  onToggleComplete?: (taskId: number, is_completed: boolean) => void;
  onDelete?: (taskId: number) => void;
}

export const TaskCard = ({ task, onToggleComplete, onDelete }: TaskCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(task.updated_at), {
    addSuffix: true,
    locale: es
  });

  const isCompleted = task.is_completed === true;
  const taskColor = task.color

  return (
    <Card className="group task-card-enter shadow-soft hover:shadow-card transition-all duration-300 border-border/50 overflow-hidden">
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: taskColor }}
      />
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-foreground leading-tight ${isCompleted ? 'line-through opacity-60' : ''}`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-2 mt-3">
              {task.category && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                  {task.category.name}
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                {timeAgo}
              </span>
            </div>
          </div>
          {(onToggleComplete || onDelete) && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onToggleComplete && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9"
                  onClick={() => onToggleComplete(task.id, !isCompleted)}
                >
                  {isCompleted ? (
                    <Circle className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500 hover:text-green-600" />
                  )}
                </Button>
              )}
              {onDelete && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 hover:bg-red-50"
                  onClick={() => onDelete(task.id)}
                >
                  <Trash2 className="h-5 w-5 text-red-500 hover:text-red-600" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};