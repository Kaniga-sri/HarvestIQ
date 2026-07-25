import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('farmer' | 'consumer' | 'admin')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    toast.error('Please log in to access this page');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    toast.error(`Access restricted. Your role (${user.role}) cannot view this page.`);
    
    // Redirect to default dashboard based on user role
    if (user.role === 'farmer') {
      return <Navigate to="/farmer-dashboard" replace />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      return <Navigate to="/consumer-dashboard" replace />;
    }
  }

  return <>{children}</>;
};
