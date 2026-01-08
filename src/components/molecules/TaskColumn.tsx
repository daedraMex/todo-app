import type{ TaskResponse } from '@/types/task';
import { TaskCard } from './TaskCard';
import { EmptyState } from './EmptyState';

interface TaskColumnProps {
  title: string;
  tasks: TaskResponse[];
  emptyMessage: string;
}

export const TaskColumn = ({ title, tasks, emptyMessage }: TaskColumnProps) => {
  return (
    <div className="flex flex-col flex-1 min-w-0 gap-4 sm:gap-6">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 px-1">
        {title}
      </h2>

      <div className="flex flex-col gap-3 sm:gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <EmptyState message={emptyMessage} />
        )}
      </div>
    </div>
  );
};