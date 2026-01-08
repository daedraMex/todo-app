import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useCreateTaskMutation } from "@/hooks/use-create-task";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/molecules/FormField";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export const CreateTaskDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const { mutate, isPending } = useCreateTaskMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    mutate({ title, description }, {
      onSuccess: () => {
        setOpen(false); // Cerramos el modal tras el éxito
        setTitle("");
        setDescription("");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-lg gradient-primary">
          <Plus className="w-4 h-4" />
          Nueva Tarea
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Tarea</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <FormField
            label="Título"
            placeholder="¿Qué hay que hacer?"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            disabled={isPending}
            icon={() => null} // No requiere icono en este diseño
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción</label>
            <Textarea
              placeholder="Añade más detalles..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              className="min-h-[100px]"
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creando...</>
              ) : (
                "Guardar Tarea"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};