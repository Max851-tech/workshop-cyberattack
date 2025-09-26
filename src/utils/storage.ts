import { Resource, DistributionRequest } from '../context/ResourceContext';

const STORAGE_KEYS = {
  RESOURCES: 'resource_manager_resources',
  DISTRIBUTION_REQUESTS: 'resource_manager_distribution_requests'
};

export const saveResources = (resources: Resource[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des ressources:', error);
  }
};

export const loadResources = (): Resource[] | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RESOURCES);
    if (stored) {
      const resources = JSON.parse(stored);
      // Convertir les dates string en objets Date
      return resources.map((resource: any) => ({
        ...resource,
        lastUpdated: new Date(resource.lastUpdated)
      }));
    }
    return null;
  } catch (error) {
    console.error('Erreur lors du chargement des ressources:', error);
    return null;
  }
};

export const saveDistributionRequests = (requests: DistributionRequest[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.DISTRIBUTION_REQUESTS, JSON.stringify(requests));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des demandes:', error);
  }
};

export const loadDistributionRequests = (): DistributionRequest[] | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DISTRIBUTION_REQUESTS);
    if (stored) {
      const requests = JSON.parse(stored);
      // Convertir les dates string en objets Date
      return requests.map((request: any) => ({
        ...request,
        createdAt: new Date(request.createdAt)
      }));
    }
    return null;
  } catch (error) {
    console.error('Erreur lors du chargement des demandes:', error);
    return null;
  }
};

export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.RESOURCES);
    localStorage.removeItem(STORAGE_KEYS.DISTRIBUTION_REQUESTS);
  } catch (error) {
    console.error('Erreur lors de la suppression des données:', error);
  }
};