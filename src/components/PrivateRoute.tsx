// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  role: 'admin' | 'user';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const { user, loading } = useAuth(); // Asegúrate de tener `loading` en el context

  // Esperando que se cargue el usuario desde localStorage o backend
  if (loading) return <p>Cargando...</p>; // Puedes poner un spinner bonito aquí

  // No está autenticado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // No tiene el rol necesario
  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
