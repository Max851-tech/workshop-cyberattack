import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'admin' | 'operator' | 'viewer';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  fullName: string;
  department: string;
  lastLogin: Date;
}

export interface Permission {
  canViewDashboard: boolean;
  canViewInventory: boolean;
  canViewDistribution: boolean;
  canEditResources: boolean;
  canApproveRequests: boolean;
  canCreateRequests: boolean;
  canManageUsers: boolean;
  canViewReports: boolean;
}

interface AuthContextType {
  user: User | null;
  permissions: Permission;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: keyof Permission) => boolean;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utilisateurs simulés pour la démo
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@cyberdefense.gov',
    role: 'admin',
    fullName: 'Administrateur Système',
    department: 'Sécurité Informatique',
    lastLogin: new Date()
  },
  {
    id: '2',
    username: 'operator',
    email: 'operator@cyberdefense.gov',
    role: 'operator',
    fullName: 'Opérateur Principal',
    department: 'Centre de Contrôle',
    lastLogin: new Date()
  },
  {
    id: '3',
    username: 'viewer',
    email: 'viewer@cyberdefense.gov',
    role: 'viewer',
    fullName: 'Observateur',
    department: 'Analyse',
    lastLogin: new Date()
  }
];

// Définition des permissions par rôle
const rolePermissions: Record<UserRole, Permission> = {
  admin: {
    canViewDashboard: true,
    canViewInventory: true,
    canViewDistribution: true,
    canEditResources: true,
    canApproveRequests: true,
    canCreateRequests: true,
    canManageUsers: true,
    canViewReports: true
  },
  operator: {
    canViewDashboard: true,
    canViewInventory: true,
    canViewDistribution: true,
    canEditResources: true,
    canApproveRequests: true,
    canCreateRequests: true,
    canManageUsers: false,
    canViewReports: true
  },
  viewer: {
    canViewDashboard: true,
    canViewInventory: true,
    canViewDistribution: true,
    canEditResources: false,
    canApproveRequests: false,
    canCreateRequests: true,
    canManageUsers: false,
    canViewReports: false
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifier s'il y a une session sauvegardée au démarrage
  useEffect(() => {
    const savedUser = localStorage.getItem('cyberdefense_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('cyberdefense_user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulation d'une authentification (en production, ceci ferait appel à une API)
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simule un délai réseau
    
    // Mots de passe simulés (ne jamais faire ça en production!)
    const credentials: Record<string, string> = {
      'admin': 'admin123',
      'operator': 'operator123',
      'viewer': 'viewer123'
    };

    if (credentials[username] === password) {
      const foundUser = mockUsers.find(u => u.username === username);
      if (foundUser) {
        const updatedUser = { ...foundUser, lastLogin: new Date() };
        setUser(updatedUser);
        setIsAuthenticated(true);
        localStorage.setItem('cyberdefense_user', JSON.stringify(updatedUser));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('cyberdefense_user');
  };

  const permissions: Permission = user ? rolePermissions[user.role] : {
    canViewDashboard: false,
    canViewInventory: false,
    canViewDistribution: false,
    canEditResources: false,
    canApproveRequests: false,
    canCreateRequests: false,
    canManageUsers: false,
    canViewReports: false
  };

  const hasPermission = (permission: keyof Permission): boolean => {
    return permissions[permission];
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider value={{
      user,
      permissions,
      login,
      logout,
      isAuthenticated,
      hasPermission,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}