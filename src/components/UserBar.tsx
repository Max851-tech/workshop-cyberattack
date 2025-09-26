import { LogOut, User, Shield, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UserBar() {
  const { user, logout, hasRole } = useAuth();

  if (!user) return null;

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-600 text-white';
      case 'operator': return 'bg-orange-600 text-white';
      case 'viewer': return 'bg-green-600 text-white';
      default: return 'bg-slate-600 text-white';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'operator': return 'Opérateur';
      case 'viewer': return 'Observateur';
      default: return role;
    }
  };

  return (
    <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <User className="h-8 w-8 text-slate-400 bg-slate-700 rounded-full p-1" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
            </div>
            <div>
              <div className="text-white font-medium">{user.fullName}</div>
              <div className="text-slate-400 text-sm">{user.department}</div>
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
            <Shield className="h-3 w-3 inline mr-1" />
            {getRoleLabel(user.role)}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {hasRole('admin') && (
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          )}
          
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  );
}