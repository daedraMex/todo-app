import type{ Task } from '@/hooks/use-tasks';
import { TaskCard } from '@/components/molecules/TaskCard';
import { EmptyState } from '@/components/molecules/EmptyState';

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  emptyMessage: string;
}

export const TaskSection = ({ title, tasks, emptyMessage }: TaskSectionProps) => (
  <section className="flex flex-col gap-4">
    <h3 className="font-display text-xl font-semibold">{title}</h3>
    {tasks.length === 0 ? (
      <EmptyState message={emptyMessage} />
    ) : (
      <div className="grid gap-3">
        {tasks.map(task => <TaskCard key={task.id} task={task} />)}
      </div>
    )}
  </section>
);