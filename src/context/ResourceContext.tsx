import React, { createContext, useContext, useState, ReactNode } from 'react';
import { saveResources, loadResources, saveDistributionRequests, loadDistributionRequests } from '../utils/storage';

export interface Resource {
  id: string;
  name: string;
  currentAmount: number;
  maxCapacity: number;
  unit: string;
  criticalLevel: number;
  warningLevel: number;
  lastUpdated: Date;
  category: 'food' | 'water' | 'medicine' | 'fuel';
}

export interface DistributionRequest {
  id: string;
  resourceId: string;
  requestedBy: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  amount: number;
  purpose: string;
  status: 'pending' | 'approved' | 'distributed' | 'rejected';
  createdAt: Date;
}

interface ResourceContextType {
  resources: Resource[];
  distributionRequests: DistributionRequest[];
  updateResource: (id: string, amount: number) => void;
  addDistributionRequest: (request: Omit<DistributionRequest, 'id' | 'createdAt'>) => void;
  updateDistributionRequest: (id: string, status: DistributionRequest['status']) => void;
}

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

const initialResources: Resource[] = [
  {
    id: '1',
    name: 'Eau potable',
    currentAmount: 850,
    maxCapacity: 1200,
    unit: 'litres',
    criticalLevel: 200,
    warningLevel: 400,
    lastUpdated: new Date(),
    category: 'water'
  },
  {
    id: '2',
    name: 'Rations alimentaires',
    currentAmount: 320,
    maxCapacity: 500,
    unit: 'unités',
    criticalLevel: 50,
    warningLevel: 100,
    lastUpdated: new Date(),
    category: 'food'
  },
  {
    id: '3',
    name: 'Médicaments essentiels',
    currentAmount: 75,
    maxCapacity: 200,
    unit: 'doses',
    criticalLevel: 20,
    warningLevel: 50,
    lastUpdated: new Date(),
    category: 'medicine'
  },
  {
    id: '4',
    name: 'Carburant',
    currentAmount: 180,
    maxCapacity: 400,
    unit: 'litres',
    criticalLevel: 40,
    warningLevel: 80,
    lastUpdated: new Date(),
    category: 'fuel'
  }
];

const initialRequests: DistributionRequest[] = [
  {
    id: '1',
    resourceId: '1',
    requestedBy: 'Hôpital Central',
    priority: 'critical',
    amount: 100,
    purpose: 'Soins d\'urgence',
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    resourceId: '2',
    requestedBy: 'Centre d\'évacuation Nord',
    priority: 'high',
    amount: 50,
    purpose: 'Population civile',
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
  },
  {
    id: '3',
    resourceId: '3',
    requestedBy: 'Clinique Sud',
    priority: 'critical',
    amount: 25,
    purpose: 'Traitements urgents',
    status: 'approved',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
  }
];

export function ResourceProvider({ children }: { children: ReactNode }) {
  // Charger les données depuis localStorage ou utiliser les données initiales
  const [resources, setResources] = useState<Resource[]>(() => {
    const savedResources = loadResources();
    return savedResources || initialResources;
  });
  
  const [distributionRequests, setDistributionRequests] = useState<DistributionRequest[]>(() => {
    const savedRequests = loadDistributionRequests();
    return savedRequests || initialRequests;
  });

  // Sauvegarder automatiquement les ressources quand elles changent
  React.useEffect(() => {
    saveResources(resources);
  }, [resources]);

  // Sauvegarder automatiquement les demandes quand elles changent
  React.useEffect(() => {
    saveDistributionRequests(distributionRequests);
  }, [distributionRequests]);

  const updateResource = (id: string, amount: number) => {
    setResources(prev => {
      return prev.map(resource => 
        resource.id === id 
          ? { ...resource, currentAmount: Math.max(0, resource.currentAmount + amount), lastUpdated: new Date() }
          : resource
      );
    });
  };

  const addDistributionRequest = (request: Omit<DistributionRequest, 'id' | 'createdAt'>) => {
    const newRequest: DistributionRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    setDistributionRequests(prev => {
      return [newRequest, ...prev];
    });
  };

  const updateDistributionRequest = (id: string, status: DistributionRequest['status']) => {
    setDistributionRequests(prev => {
      return prev.map(request => {
        if (request.id === id) {
          if (status === 'distributed') {
            updateResource(request.resourceId, -request.amount);
          }
          return { ...request, status };
        }
        return request;
      });
    });
  };

  return (
    <ResourceContext.Provider value={{
      resources,
      distributionRequests,
      updateResource,
      addDistributionRequest,
      updateDistributionRequest
    }}>
      {children}
    </ResourceContext.Provider>
  );
}

export function useResourceContext() {
  const context = useContext(ResourceContext);
  if (context === undefined) {
    throw new Error('useResourceContext must be used within a ResourceProvider');
  }
  return context;
}