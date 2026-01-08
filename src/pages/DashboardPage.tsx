import { useTasks } from '@/hooks/use-tasks';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { Header } from '@/components/organisms/Header';
import { TaskSection } from '@/components/organisms/TaskSection';
import { RecentTasksScroll } from '@/components/organisms/RecentTasksSroll';

export default function DashboardPage() {
  const { tasksQuery } = useTasks(); // Hook que definimos con TanStack Query
  const tasks = tasksQuery.data || [];

  // Lógica de negocio/filtrado
  const pendingTasks = tasks.filter(t => !t.is_completed).slice(0, 6);
  const completedTasks = tasks.filter(t => t.is_completed).slice(0, 6);
  
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  if (tasksQuery.isLoading) return <div>Cargando Dashboard...</div>;

  return (
    <DashboardTemplate 
      header={<Header />}
      recentTasks={<RecentTasksScroll tasks={recentTasks} />}
      welcomeMessage={
        <div>
          <h1 className="font-display text-2xl font-bold">Mis Tareas</h1>
          <p className="text-muted-foreground">Organiza tu día de forma eficiente</p>
        </div>
      }
      pendingSection={
        <TaskSection 
          title="Pendientes" 
          tasks={pendingTasks} 
          emptyMessage="¡No hay tareas pendientes! 🎉" 
        />
      }
      completedSection={
        <TaskSection 
          title="Finalizadas" 
          tasks={completedTasks} 
          emptyMessage="Aún no has completado tareas" 
        />
      }
    />
  );
}