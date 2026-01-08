import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useCreateTaskMutation } from "@/hooks/use-create-task";
import { useCategories } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/molecules/FormField";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogTrigger, DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const CreateTaskDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const { mutate, isPending } = useCreateTaskMutation();
  const { categories, isLoading: loadingCategories } = useCategories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !categoryId) return;

    mutate({
      title,
      description: description.trim() || undefined,
      category_id: categoryId,
      is_completed: false
    }, {
      onSuccess: () => {
        setOpen(false);
        setTitle("");
        setDescription("");
        setCategoryId(null);
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
            icon={() => null}
          />

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Añade más detalles..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría *</Label>
            <Select
              value={categoryId?.toString()}
              onValueChange={(value: string) => setCategoryId(Number(value))}
              disabled={isPending || loadingCategories}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending || !categoryId}
            >
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