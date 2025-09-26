import React from 'react';
import { useResourceContext } from '../context/ResourceContext';
import { AlertTriangle, Clock, TrendingDown } from 'lucide-react';

export default function AlertPanel() {
  const { resources, distributionRequests } = useResourceContext();

  const criticalResources = resources.filter(r => r.currentAmount <= r.criticalLevel);
  const warningResources = resources.filter(r => r.currentAmount <= r.warningLevel && r.currentAmount > r.criticalLevel);
  const criticalRequests = distributionRequests.filter(r => r.status === 'pending' && r.priority === 'critical');

  const alerts = [
    ...criticalResources.map(resource => ({
      id: `critical-${resource.id}`,
      type: 'critical' as const,
      title: 'Niveau critique',
      message: `${resource.name}: ${resource.currentAmount} ${resource.unit} restants`,
      timestamp: resource.lastUpdated,
      icon: AlertTriangle
    })),
    ...warningResources.map(resource => ({
      id: `warning-${resource.id}`,
      type: 'warning' as const,
      title: 'Niveau d\'alerte',
      message: `${resource.name}: ${resource.currentAmount} ${resource.unit} restants`,
      timestamp: resource.lastUpdated,
      icon: TrendingDown
    })),
    ...criticalRequests.map(request => ({
      id: `request-${request.id}`,
      type: 'urgent' as const,
      title: 'Demande urgente',
      message: `${request.requestedBy} - ${request.amount} unités`,
      timestamp: request.createdAt,
      icon: Clock
    }))
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const getAlertStyle = (type: 'critical' | 'warning' | 'urgent') => {
    switch (type) {
      case 'critical':
        return 'border-l-red-500 bg-red-500/5';
      case 'warning':
        return 'border-l-amber-500 bg-amber-500/5';
      case 'urgent':
        return 'border-l-blue-500 bg-blue-500/5';
    }
  };

  const getIconColor = (type: 'critical' | 'warning' | 'urgent') => {
    switch (type) {
      case 'critical':
        return 'text-red-500';
      case 'warning':
        return 'text-amber-500';
      case 'urgent':
        return 'text-blue-500';
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
        <AlertTriangle className="w-5 h-5" />
        <span>Alertes</span>
        {alerts.length > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">
            {alerts.length}
          </span>
        )}
      </h2>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-slate-400 text-center py-4">
            Aucune alerte active
          </div>
        ) : (
          alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className={`border-l-4 pl-4 py-3 ${getAlertStyle(alert.type)}`}
              >
                <div className="flex items-start space-x-3">
                  <Icon className={`w-5 h-5 ${getIconColor(alert.type)} mt-0.5`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{alert.title}</h4>
                    <p className="text-sm text-slate-300">{alert.message}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {alert.timestamp.toLocaleTimeString('fr-FR')}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}