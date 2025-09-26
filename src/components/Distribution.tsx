import { useState } from 'react';
import { useResourceContext } from '../context/ResourceContext';
import { Check, X, Clock, AlertTriangle, Users, Plus } from 'lucide-react';
import { ConditionalRender } from './ProtectedRoute';

export default function Distribution() {
  const { resources, distributionRequests, updateDistributionRequest, addDistributionRequest } = useResourceContext();
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [newRequest, setNewRequest] = useState({
    resourceId: '',
    requestedBy: '',
    priority: 'medium' as const,
    amount: 0,
    purpose: ''
  });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRequest.resourceId && newRequest.requestedBy && newRequest.amount > 0) {
      addDistributionRequest({
        ...newRequest,
        status: 'pending'
      });
      setNewRequest({
        resourceId: '',
        requestedBy: '',
        priority: 'medium',
        amount: 0,
        purpose: ''
      });
      setShowNewRequest(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      critical: 'bg-red-500/20 text-red-400 border-red-500/30',
      high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      approved: 'bg-blue-500/20 text-blue-400',
      distributed: 'bg-green-500/20 text-green-400',
      rejected: 'bg-red-500/20 text-red-400'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const sortedRequests = [...distributionRequests].sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const statusOrder = { pending: 0, approved: 1, distributed: 2, rejected: 3 };
    
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const getResourceName = (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId);
    return resource ? resource.name : 'Ressource inconnue';
  };

  const getResourceUnit = (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId);
    return resource ? resource.unit : 'unités';
  };

  const canDistribute = (request: any) => {
    const resource = resources.find(r => r.id === request.resourceId);
    return resource && resource.currentAmount >= request.amount;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Distribution des ressources</h1>
        <ConditionalRender permission="canCreateRequests">
          <button
            onClick={() => setShowNewRequest(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle demande</span>
          </button>
        </ConditionalRender>
      </div>

      {/* New Request Form */}
      {showNewRequest && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Nouvelle demande de distribution</h2>
            <button
              onClick={() => setShowNewRequest(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Ressource demandée
                </label>
                <select
                  value={newRequest.resourceId}
                  onChange={(e) => setNewRequest({ ...newRequest, resourceId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  required
                >
                  <option value="">Sélectionner une ressource</option>
                  {resources.map(resource => (
                    <option key={resource.id} value={resource.id}>
                      {resource.name} ({resource.currentAmount} {resource.unit} disponibles)
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Demandeur
                </label>
                <input
                  type="text"
                  value={newRequest.requestedBy}
                  onChange={(e) => setNewRequest({ ...newRequest, requestedBy: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                  placeholder="Nom de l'organisation"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Quantité
                </label>
                <input
                  type="number"
                  value={newRequest.amount || ''}
                  onChange={(e) => setNewRequest({ ...newRequest, amount: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                  placeholder="Quantité demandée"
                  min="1"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Priorité
                </label>
                <select
                  value={newRequest.priority}
                  onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                >
                  <option value="low">Basse</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                  <option value="critical">Critique</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Motif de la demande
              </label>
              <textarea
                value={newRequest.purpose}
                onChange={(e) => setNewRequest({ ...newRequest, purpose: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                placeholder="Expliquez l'usage prévu des ressources"
                rows={3}
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Soumettre la demande
              </button>
              <button
                type="button"
                onClick={() => setShowNewRequest(false)}
                className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Distribution Requests */}
      <div className="space-y-4">
        {sortedRequests.length === 0 ? (
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 text-center">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400">Aucune demande de distribution</p>
          </div>
        ) : (
          sortedRequests.map((request) => (
            <div key={request.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{request.requestedBy}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(request.priority)}`}>
                      {request.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-slate-300">
                    <p><span className="font-medium">Ressource:</span> {getResourceName(request.resourceId)}</p>
                    <p><span className="font-medium">Quantité:</span> {request.amount} {getResourceUnit(request.resourceId)}</p>
                    <p><span className="font-medium">Motif:</span> {request.purpose || 'Non spécifié'}</p>
                    <p><span className="font-medium">Demande créée:</span> {request.createdAt.toLocaleString('fr-FR')}</p>
                  </div>
                </div>
                
                {request.status === 'pending' && (
                  <ConditionalRender permission="canApproveRequests">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateDistributionRequest(request.id, 'approved')}
                        className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        title="Approuver"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateDistributionRequest(request.id, 'rejected')}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        title="Rejeter"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </ConditionalRender>
                )}
                
                {request.status === 'approved' && (
                  <ConditionalRender permission="canApproveRequests">
                    <div className="flex flex-col space-y-2">
                      {canDistribute(request) ? (
                        <button
                          onClick={() => updateDistributionRequest(request.id, 'distributed')}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          <Clock className="w-4 h-4" />
                          <span>Distribuer</span>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Stock insuffisant</span>
                        </div>
                      )}
                    </div>
                  </ConditionalRender>
                )}
              </div>
              
              {!canDistribute(request) && request.status === 'approved' && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">
                    ⚠️ Stock insuffisant pour cette distribution. 
                    Stock disponible: {resources.find(r => r.id === request.resourceId)?.currentAmount || 0} {getResourceUnit(request.resourceId)}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}