import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { ACCOUNT_DISABLED_MESSAGE, isProfileActive } from '../../lib/authMessages';
import type { UserRole } from '../../lib/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b',
          fontSize: '15px',
        }}
      >
        Chargement…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/connexion" state={{ from: location.pathname }} replace />;
  }

  if (profile && !isProfileActive(profile)) {
    return (
      <Navigate
        to="/connexion"
        state={{ message: ACCOUNT_DISABLED_MESSAGE }}
        replace
      />
    );
  }

  if (!profile) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          textAlign: 'center',
          color: '#64748b',
        }}
      >
        <p>Profil introuvable. Contactez le support Wood Clean Services.</p>
      </div>
    );
  }

  if (requiredRole && profile.role !== requiredRole) {
    const redirectTo = profile.role === 'admin' ? '/admin' : '/espace-client';
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
