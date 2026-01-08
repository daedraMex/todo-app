import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TaskCard } from "@/components/molecules/TaskCard";
import type{ Task } from "@/hooks/use-tasks";
import { Sparkles } from "lucide-react";

interface RecentTasksScrollProps {
  tasks: Task[];
}

export const RecentTasksScroll = ({ tasks }: RecentTasksScrollProps) => {
  if (tasks.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 px-1">
        <Sparkles className="w-5 h-5 text-yellow-500" />
        <h2 className="font-display text-lg font-semibold text-foreground">
          Actividad Reciente
        </h2>
      </div>

      <ScrollArea className="w-full whitespace-nowrap rounded-md border-none">
        <div className="flex w-max space-x-4 p-1">
          {tasks.map((task) => (
            <div key={task.id} className="w-[280px] shrink-0">
              <TaskCard task={task} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};