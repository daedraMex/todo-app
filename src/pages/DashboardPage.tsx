import { useTasksDashboard } from '@/hooks/useTasksDashboard';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { Header } from '@/components/organisms/Header';
import { TaskBoard } from '@/components/organisms/TaskBoard';

export default function DashboardPage() {
  const { pendingTasks, completedTasks, isLoading } = useTasksDashboard();

  if (isLoading) return <div>Cargando Dashboard...</div>;

  return (
    <DashboardTemplate
      header={<Header />}
      recentTasks={null}
      welcomeMessage={
        <div>
          <h1 className="font-display text-2xl font-bold">Mis Tareas</h1>
          <p className="text-muted-foreground">Organiza tu día de forma eficiente</p>
        </div>
      }
      tasksList={
        <TaskBoard
          pendingTasks={pendingTasks}
          completedTasks={completedTasks}
        />
      }
    />
  );
}