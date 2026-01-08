import { TaskColumn } from '../molecules/TaskColumn';
import type { TaskResponse } from '@/types/task';

interface TaskBoardProps {
  pendingTasks: TaskResponse[];
  completedTasks: TaskResponse[];
  onToggleComplete: (taskId: number, isCompleted: boolean) => void;
  onDelete: (taskId: number) => void;
}

export const TaskBoard = ({ pendingTasks, completedTasks, onToggleComplete, onDelete }: TaskBoardProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-2 sm:p-4 md:p-6 w-full max-w-7xl mx-auto">
      <TaskColumn
        title="Pendientes"
        tasks={pendingTasks}
        emptyMessage="¡No hay tareas pendientes! 🎉"
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />

      <TaskColumn
        title="Finalizadas"
        tasks={completedTasks}
        emptyMessage="Aún no has completado tareas"
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    </div>
  );
};