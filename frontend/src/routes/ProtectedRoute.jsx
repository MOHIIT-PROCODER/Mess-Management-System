import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user role is not allowed for this route, redirect to their own portal
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'mess_admin') {
      return <Navigate to="/admin" replace />;
    }
    if (user.role === 'super_admin') {
      return <Navigate to="/superadmin" replace />;
    }
    // Default fallback for students
    return <Navigate to="/student" replace />;
  }

  return children;
};
