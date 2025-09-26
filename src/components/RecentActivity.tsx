import React from 'react';
import { useResourceContext } from '../context/ResourceContext';
import { Activity, ArrowDown, ArrowUp, CheckCircle, XCircle } from 'lucide-react';

export default function RecentActivity() {
  const { distributionRequests } = useResourceContext();

  const recentActivity = distributionRequests
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5)
    .map(request => ({
      id: request.id,
      type: request.status === 'distributed' ? 'distribution' : 
            request.status === 'approved' ? 'approval' :
            request.status === 'rejected' ? 'rejection' : 'request',
      title: getActivityTitle(request),
      subtitle: `${request.requestedBy} - ${request.amount} unités`,
      timestamp: request.createdAt,
      status: request.status,
      priority: request.priority
    }));

  function getActivityTitle(request: any) {
    switch (request.status) {
      case 'distributed':
        return 'Ressource distribuée';
      case 'approved':
        return 'Demande approuvée';
      case 'rejected':
        return 'Demande rejetée';
      default:
        return 'Nouvelle demande';
    }
  }

  const getActivityIcon = (type: string, status: string) => {
    if (status === 'distributed') return ArrowDown;
    if (status === 'approved') return CheckCircle;
    if (status === 'rejected') return XCircle;
    return ArrowUp;
  };

  const getActivityColor = (status: string, priority: string) => {
    if (status === 'distributed') return 'text-green-500';
    if (status === 'approved') return 'text-blue-500';
    if (status === 'rejected') return 'text-red-500';
    if (priority === 'critical') return 'text-red-500';
    return 'text-amber-500';
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      critical: 'bg-red-500/20 text-red-400',
      high: 'bg-orange-500/20 text-orange-400',
      medium: 'bg-yellow-500/20 text-yellow-400',
      low: 'bg-green-500/20 text-green-400'
    };
    return styles[priority as keyof typeof styles] || styles.medium;
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
        <Activity className="w-5 h-5" />
        <span>Activité récente</span>
      </h2>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {recentActivity.length === 0 ? (
          <div className="text-slate-400 text-center py-4">
            Aucune activité récente
          </div>
        ) : (
          recentActivity.map((activity) => {
            const Icon = getActivityIcon(activity.type, activity.status);
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 bg-slate-700 rounded-lg"
              >
                <Icon className={`w-5 h-5 ${getActivityColor(activity.status, activity.priority)} mt-0.5`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white">{activity.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityBadge(activity.priority)}`}>
                      {activity.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">{activity.subtitle}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {activity.timestamp.toLocaleString('fr-FR')}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}