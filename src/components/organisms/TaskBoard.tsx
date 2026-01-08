import { TaskColumn } from '../molecules/TaskColumn';
import type { TaskResponse } from '@/types/task';

interface TaskBoardProps {
  pendingTasks: TaskResponse[];
  completedTasks: TaskResponse[];
}

export const TaskBoard = ({ pendingTasks, completedTasks }: TaskBoardProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-2 sm:p-4 md:p-6 w-full max-w-7xl mx-auto">
      <TaskColumn
        title="Pendientes"
        tasks={pendingTasks}
        emptyMessage="¡No hay tareas pendientes! 🎉"
      />

      <TaskColumn
        title="Finalizadas"
        tasks={completedTasks}
        emptyMessage="Aún no has completado tareas"
      />
    </div>
  );
};