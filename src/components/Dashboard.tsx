import { useResourceContext } from '../context/ResourceContext';
import ResourceGauge from './ResourceGauge';
import AlertPanel from './AlertPanel';
import RecentActivity from './RecentActivity';
import { AlertTriangle, TrendingUp, Users, Clock } from 'lucide-react';

export default function Dashboard() {
  const { resources, distributionRequests } = useResourceContext();

  const criticalResources = resources.filter(r => r.currentAmount <= r.criticalLevel);
  const warningResources = resources.filter(r => r.currentAmount <= r.warningLevel && r.currentAmount > r.criticalLevel);
  const pendingRequests = distributionRequests.filter(r => r.status === 'pending');
  const criticalRequests = pendingRequests.filter(r => r.priority === 'critical');

  const stats = [
    {
      title: 'Ressources critiques',
      value: criticalResources.length,
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      title: 'Niveaux d\'alerte',
      value: warningResources.length,
      icon: TrendingUp,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    },
    {
      title: 'Demandes en attente',
      value: pendingRequests.length,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Urgences critiques',
      value: criticalRequests.length,
      icon: Clock,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
        <div className="text-slate-400">
          Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resource Gauges */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-6">État des ressources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource) => (
            <ResourceGauge key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts Panel */}
        <AlertPanel />
        
        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  );
}