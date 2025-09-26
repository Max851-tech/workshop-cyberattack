import React from 'react';
import { Resource } from '../context/ResourceContext';

interface ResourceGaugeProps {
  resource: Resource;
}

export default function ResourceGauge({ resource }: ResourceGaugeProps) {
  const percentage = (resource.currentAmount / resource.maxCapacity) * 100;
  const criticalPercentage = (resource.criticalLevel / resource.maxCapacity) * 100;
  const warningPercentage = (resource.warningLevel / resource.maxCapacity) * 100;

  const getStatusColor = () => {
    if (resource.currentAmount <= resource.criticalLevel) return 'from-red-500 to-red-600';
    if (resource.currentAmount <= resource.warningLevel) return 'from-amber-500 to-amber-600';
    return 'from-green-500 to-green-600';
  };

  const getStatusText = () => {
    if (resource.currentAmount <= resource.criticalLevel) return 'CRITIQUE';
    if (resource.currentAmount <= resource.warningLevel) return 'ALERTE';
    return 'NORMAL';
  };

  const categoryIcons = {
    water: '💧',
    food: '🍞',
    medicine: '💊',
    fuel: '⛽'
  };

  return (
    <div className="bg-slate-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{categoryIcons[resource.category]}</span>
          <h3 className="font-medium text-white">{resource.name}</h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded font-medium ${
          resource.currentAmount <= resource.criticalLevel 
            ? 'bg-red-500/20 text-red-400' 
            : resource.currentAmount <= resource.warningLevel
              ? 'bg-amber-500/20 text-amber-400'
              : 'bg-green-500/20 text-green-400'
        }`}>
          {getStatusText()}
        </span>
      </div>

      <div className="relative mb-3">
        <div className="w-full bg-slate-600 rounded-full h-3">
          <div 
            className={`h-3 rounded-full bg-gradient-to-r ${getStatusColor()}`}
            style={{ width: `${Math.min(100, percentage)}%` }}
          />
          
          {/* Critical level indicator */}
          <div 
            className="absolute top-0 w-0.5 h-3 bg-red-400"
            style={{ left: `${criticalPercentage}%` }}
          />
          
          {/* Warning level indicator */}
          <div 
            className="absolute top-0 w-0.5 h-3 bg-amber-400"
            style={{ left: `${warningPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-slate-300">
          {resource.currentAmount} {resource.unit}
        </span>
        <span className="text-slate-400">
          {percentage.toFixed(1)}%
        </span>
      </div>

      <div className="text-xs text-slate-500 mt-1">
        Max: {resource.maxCapacity} {resource.unit}
      </div>
    </div>
  );
}