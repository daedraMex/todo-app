import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import TasksPage from '@/pages/TasksPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PublicRoute } from '@/components/auth/PublicRoute';

export const router = createBrowserRouter([
  {
    // Rutas protegidas por autenticación
    element: <ProtectedRoute />,
    children: [
      { path: '/tasks', element: <TasksPage /> },
      { path: '/', element: <TasksPage /> },
    ],
  },
  {
    // Rutas públicas (Login/Registro)
    element: <PublicRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
    ],
  },
  {
    path: '*',
    element: <div>404 - Not Found</div>,
  },
]);