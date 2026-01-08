interface DashboardTemplateProps {
  header: React.ReactNode;
  welcomeMessage: React.ReactNode;
  tasksList: React.ReactNode;
  recentTasks: React.ReactNode | null;

}

export const DashboardTemplate = (props: DashboardTemplateProps) => (
  <div className="min-h-screen bg-background">
    {props.header}
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {props.recentTasks}
        {props.welcomeMessage}
        <div className="grid gap-8 lg:grid-cols-2">
          {props.tasksList}
        </div>
      </div>
    </main>
  </div>
);