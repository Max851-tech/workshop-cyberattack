import { useState } from 'react';
import { useResourceContext } from '../context/ResourceContext';
import { Plus, Minus, Package, Edit3, X } from 'lucide-react';
import { ConditionalRender } from './ProtectedRoute';

export default function Inventory() {
  const { resources, updateResource } = useResourceContext();
  const [editingResource, setEditingResource] = useState<string | null>(null);
  const [adjustmentAmount, setAdjustmentAmount] = useState<{ [key: string]: number }>({});

  const handleAdjustment = (resourceId: string, amount: number) => {
    updateResource(resourceId, amount);
    setAdjustmentAmount({ ...adjustmentAmount, [resourceId]: 0 });
  };

  const categoryColors = {
    water: 'from-blue-500 to-blue-600',
    food: 'from-green-500 to-green-600', 
    medicine: 'from-red-500 to-red-600',
    fuel: 'from-yellow-500 to-yellow-600'
  };

  const categoryLabels = {
    water: 'Eau',
    food: 'Nourriture',
    medicine: 'Médical',
    fuel: 'Carburant'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Inventaire des ressources</h1>
        <div className="text-slate-400">
          {resources.length} ressources surveillées
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {resources.map((resource) => {
          const percentage = (resource.currentAmount / resource.maxCapacity) * 100;
          const isEditing = editingResource === resource.id;
          
          return (
            <div key={resource.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${categoryColors[resource.category]} flex items-center justify-center`}>
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{resource.name}</h3>
                    <span className="text-sm px-2 py-1 rounded bg-slate-700 text-slate-300">
                      {categoryLabels[resource.category]}
                    </span>
                  </div>
                </div>
                <ConditionalRender permission="canEditResources">
                  <button
                    onClick={() => setEditingResource(isEditing ? null : resource.id)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                  </button>
                </ConditionalRender>
              </div>

              {/* Resource Level Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-300 mb-2">
                  <span>Niveau actuel</span>
                  <span>{percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full bg-gradient-to-r ${categoryColors[resource.category]}`}
                    style={{ width: `${Math.min(100, percentage)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0</span>
                  <span>{resource.maxCapacity} {resource.unit}</span>
                </div>
              </div>

              {/* Resource Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{resource.currentAmount}</p>
                  <p className="text-xs text-slate-400">Disponible</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-500">{resource.warningLevel}</p>
                  <p className="text-xs text-slate-400">Seuil alerte</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-500">{resource.criticalLevel}</p>
                  <p className="text-xs text-slate-400">Seuil critique</p>
                </div>
              </div>

              {/* Adjustment Controls */}
              {isEditing && (
                <div className="space-y-4 bg-slate-700 rounded-lg p-4">
                  <h4 className="font-medium text-white">Ajuster les stocks</h4>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      value={adjustmentAmount[resource.id] || 0}
                      onChange={(e) => setAdjustmentAmount({
                        ...adjustmentAmount,
                        [resource.id]: parseInt(e.target.value) || 0
                      })}
                      className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                      placeholder={`Quantité (${resource.unit})`}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAdjustment(resource.id, adjustmentAmount[resource.id] || 0)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter</span>
                    </button>
                    <button
                      onClick={() => handleAdjustment(resource.id, -(adjustmentAmount[resource.id] || 0))}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                      <span>Retirer</span>
                    </button>
                  </div>

                  <div className="text-xs text-slate-400">
                    Dernière mise à jour: {resource.lastUpdated.toLocaleString('fr-FR')}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}