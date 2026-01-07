import { CheckSquare } from 'lucide-react';

 export const Logo = () => {
  return (
    <div className="text-center mb-8">
    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
      <CheckSquare className="w-8 h-8 text-primary-foreground" />
    </div>
    <h1 className="font-display text-3xl font-bold text-foreground">TodoApp</h1>
  </div>
  )
}