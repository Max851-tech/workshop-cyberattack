import { useState } from 'react';
import { Users, UserPlus, Edit, Trash2, Shield, Calendar, Mail } from 'lucide-react';
import { useAuth, User, UserRole } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

export default function UserManagement() {
  const { user: currentUser } = useAuth();
  const [users] = useState<User[]>([
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
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '3',
      username: 'viewer',
      email: 'viewer@cyberdefense.gov',
      role: 'viewer',
      fullName: 'Observateur',
      department: 'Analyse',
      lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      username: 'analyst',
      email: 'analyst@cyberdefense.gov',
      role: 'viewer',
      fullName: 'Analyste Senior',
      department: 'Analyse de Menaces',
      lastLogin: new Date(Date.now() - 3 * 60 * 60 * 1000)
    }
  ]);

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'operator': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'viewer': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'operator': return 'Opérateur';
      case 'viewer': return 'Observateur';
      default: return role;
    }
  };

  const formatLastLogin = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'À l\'instant';
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return 'Hier';
    return `Il y a ${diffDays} jours`;
  };

  return (
    <ProtectedRoute requiredPermission="canManageUsers">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <h1 className="text-2xl font-bold text-white">Gestion des Utilisateurs</h1>
              <p className="text-slate-400">Administrer les comptes et permissions</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <UserPlus className="h-4 w-4" />
            <span>Nouvel utilisateur</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Utilisateurs</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Administrateurs</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Opérateurs</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'operator').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Observateurs</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'viewer').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-slate-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white">Liste des Utilisateurs</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Département
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Dernière Connexion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {user.fullName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white flex items-center">
                            {user.fullName}
                            {user.id === currentUser?.id && (
                              <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                                Vous
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-slate-400 flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {user.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatLastLogin(user.lastLogin)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        {user.id !== currentUser?.id && (
                          <button className="text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}