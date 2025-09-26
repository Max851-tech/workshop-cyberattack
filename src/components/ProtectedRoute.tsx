import { ReactNode } from 'react';
import { useAuth, UserRole } from '../context/AuthContext';
import { Shield, AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
  fallback?: ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  requiredPermission, 
  fallback 
}: ProtectedRouteProps) {
  const { user, hasRole, hasPermission } = useAuth();

  // Vérifier si l'utilisateur a le rôle requis
  if (requiredRole && !hasRole(requiredRole)) {
    return fallback || (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Accès Restreint
          </h3>
          <p className="text-slate-400">
            Vous devez avoir le rôle "{requiredRole}" pour accéder à cette section.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Votre rôle actuel: {user?.role || 'Non défini'}
          </p>
        </div>
      </div>
    );
  }

  // Vérifier si l'utilisateur a la permission requise
  if (requiredPermission && !hasPermission(requiredPermission as any)) {
    return fallback || (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Permission Insuffisante
          </h3>
          <p className="text-slate-400">
            Vous n'avez pas les permissions nécessaires pour accéder à cette section.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Permission requise: {requiredPermission}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Composant pour masquer des éléments selon les permissions
interface ConditionalRenderProps {
  children: ReactNode;
  role?: UserRole;
  permission?: string;
  fallback?: ReactNode;
}

export function ConditionalRender({ 
  children, 
  role, 
  permission, 
  fallback = null 
}: ConditionalRenderProps) {
  const { hasRole, hasPermission } = useAuth();

  if (role && !hasRole(role)) {
    return <>{fallback}</>;
  }

  if (permission && !hasPermission(permission as any)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}