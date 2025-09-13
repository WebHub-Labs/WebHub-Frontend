import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, requireAdmin = false, requireSuperAdmin = false }) => {
  const { user, loading, isAuthenticated, isAdmin, isSuperAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      if (requireSuperAdmin && !isSuperAdmin()) {
        router.push('/dashboard');
        return;
      }

      if (requireAdmin && !isAdmin()) {
        router.push('/dashboard');
        return;
      }
    }
  }, [loading, isAuthenticated, user, requireAdmin, requireSuperAdmin, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requireSuperAdmin && !isSuperAdmin()) {
    return null;
  }

  if (requireAdmin && !isAdmin()) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
