import type { Task } from '@/hooks/use-tasks'; 
import { Card } from '@/components/ui/card'; 
import { Badge } from '@/components/ui/badge'; 

export const TaskCard = ({ task }: { task: Task }) => (
  <Card className="p-4 hover:shadow-md transition-shadow">
    <h4 className="font-medium text-foreground">{task.title}</h4>
    <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
    <div className="mt-2">
      <Badge variant={task.is_completed ? "default" : "secondary"}>
        {task.is_completed ? "Completada" : "Pendiente"}
      </Badge>
    </div>
  </Card>
);