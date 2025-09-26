import { BarChart3, Package, Share2, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const { hasPermission } = useAuth();
  
  const tabs = [
    { 
      id: 'dashboard', 
      label: 'Tableau de bord', 
      icon: BarChart3, 
      permission: 'canViewDashboard' 
    },
    { 
      id: 'inventory', 
      label: 'Inventaire', 
      icon: Package, 
      permission: 'canViewInventory' 
    },
    { 
      id: 'distribution', 
      label: 'Distribution', 
      icon: Share2, 
      permission: 'canViewDistribution' 
    },
    { 
      id: 'users', 
      label: 'Utilisateurs', 
      icon: Users, 
      permission: 'canManageUsers' 
    }
  ];

  // Filtrer les onglets selon les permissions
  const visibleTabs = tabs.filter(tab => hasPermission(tab.permission as any));

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-slate-900" />
            </div>
            <h1 className="text-xl font-bold text-white">Gestionnaire de Ressources</h1>
          </div>
          
          <div className="flex space-x-1">
            {visibleTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-amber-500 text-slate-900'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}