# Système de Cyberdéfense - Gestionnaire de Ressources Critiques

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178c6.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38b2ac.svg)

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités](#fonctionnalités)
- [Architecture technique](#architecture-technique)
- [Installation et configuration](#installation-et-configuration)
- [Guide d'utilisation](#guide-dutilisation)
- [Documentation technique](#documentation-technique)
- [Sécurité](#sécurité)
- [Contribution](#contribution)

## 🎯 Vue d'ensemble

Le **Système de Cyberdéfense - Gestionnaire de Ressources Critiques** est une application web moderne conçue pour la gestion et la surveillance en temps réel des ressources essentielles dans un contexte de sécurité critique. L'application permet aux organisations de suivre, distribuer et gérer efficacement leurs ressources vitales (eau, nourriture, médicaments, carburant) avec un système d'authentification à trois niveaux.

### Objectifs principaux

- **Surveillance en temps réel** des niveaux de ressources critiques
- **Gestion des alertes** automatiques basées sur des seuils configurables
- **Distribution contrôlée** des ressources avec système d'approbation
- **Authentification sécurisée** avec gestion des rôles et permissions
- **Interface intuitive** adaptée aux situations d'urgence

## ✨ Fonctionnalités

### 🔐 Système d'authentification

- **Trois niveaux d'accès avec permissions spécifiques** :
  - **Admin** : Accès complet - peut tout faire (admin/admin123)
  - **Opérateur** : Gestion des ressources - peut modifier les stocks, créer et valider les demandes (operator/operator123)
  - **Observateur** : Consultation et demandes - peut consulter les données et créer des demandes de distribution (viewer/viewer123)
- **Interface de connexion sécurisée** avec validation des identifiants
- **Gestion des sessions** avec déconnexion automatique
- **Contrôle d'accès basé sur les rôles** (RBAC)

### 📊 Tableau de bord

- **Vue d'ensemble en temps réel** des ressources critiques
- **Indicateurs visuels** avec jauges de niveau colorées
- **Statistiques clés** :
  - Nombre de ressources critiques
  - Niveaux d'alerte actifs
  - Demandes en attente
  - Urgences critiques
- **Panneau d'alertes** avec notifications prioritaires
- **Activité récente** avec historique des actions

### 📦 Gestion d'inventaire

- **Suivi en temps réel** des stocks de 4 catégories :
  - 💧 **Eau potable** (litres)
  - 🍞 **Rations alimentaires** (unités)
  - 💊 **Médicaments essentiels** (doses)
  - ⛽ **Carburant** (litres)
- **Ajustement des stocks** avec interface intuitive
- **Seuils configurables** (critique et alerte)
- **Historique des modifications** avec horodatage

### 🚚 Distribution des ressources

- **Système de demandes** avec formulaire structuré
- **Gestion des priorités** (Critique, Haute, Moyenne, Basse)
- **Workflow d'approbation** :
  - Soumission de demande
  - Approbation/Rejet
  - Distribution effective
- **Vérification automatique** des stocks disponibles
- **Traçabilité complète** des distributions

### 🔔 Système d'alertes

- **Alertes automatiques** basées sur les seuils
- **Classification par priorité** avec codes couleur
- **Notifications en temps réel** pour les situations critiques
- **Historique des alertes** avec résolution

## 🏗️ Architecture technique

### Stack technologique

#### Frontend
- **React 18.3.1** - Framework UI moderne
- **TypeScript 5.5.3** - Typage statique pour la robustesse
- **Tailwind CSS 3.4.1** - Framework CSS utilitaire
- **Lucide React** - Bibliothèque d'icônes
- **Vite 5.4.2** - Outil de build rapide

#### Outils de développement
- **ESLint** - Analyse statique du code
- **PostCSS** - Traitement CSS
- **Autoprefixer** - Compatibilité navigateurs

### Structure du projet

```
src/
├── components/          # Composants React réutilisables
│   ├── Dashboard.tsx    # Tableau de bord principal
│   ├── Inventory.tsx    # Gestion d'inventaire
│   ├── Distribution.tsx # Distribution des ressources
│   ├── Navigation.tsx   # Barre de navigation
│   ├── AlertPanel.tsx   # Panneau d'alertes
│   ├── ResourceGauge.tsx # Jauges de ressources
│   ├── RecentActivity.tsx # Activité récente
│   └── Login.tsx        # Interface de connexion
├── context/             # Contextes React
│   ├── ResourceContext.tsx # Gestion d'état des ressources
│   └── AuthContext.tsx     # Gestion d'authentification
├── utils/               # Utilitaires
│   └── storage.ts       # Gestion localStorage
├── types/               # Définitions TypeScript
│   └── index.ts         # Types globaux
├── App.tsx              # Composant racine
├── main.tsx            # Point d'entrée
└── index.css           # Styles globaux
```

### Gestion d'état

L'application utilise le **Context API** de React pour la gestion d'état globale :

- **ResourceContext** : Gestion des ressources et demandes de distribution
- **AuthContext** : Gestion de l'authentification et des permissions

### Persistance des données

- **localStorage** pour la persistance côté client
- **Sauvegarde automatique** des modifications
- **Récupération automatique** au démarrage
- **Fonction de réinitialisation** pour les tests

## 🚀 Installation et configuration

### Prérequis

- **Node.js** 18.0.0 ou supérieur
- **npm** 9.0.0 ou supérieur
- Navigateur moderne (Chrome, Firefox, Safari, Edge)

### Installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd critical-resource-management
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer le serveur de développement**
```bash
npm run dev
```

4. **Accéder à l'application**
```
http://localhost:5173
```

### Scripts disponibles

```bash
npm run dev      # Démarrage en mode développement
npm run build    # Build de production
npm run preview  # Prévisualisation du build
npm run lint     # Analyse du code avec ESLint
```

## 📖 Guide d'utilisation

### 1. Connexion

1. Accédez à l'application via votre navigateur
2. Sélectionnez votre niveau d'accès :
   - **Admin** : admin/admin123
   - **Opérateur** : operator/operator123
   - **Observateur** : viewer/viewer123
3. Cliquez sur "Se connecter"

### 2. Navigation

L'interface principale comprend trois sections :

#### 📊 Tableau de bord
- **Vue d'ensemble** des statistiques clés
- **Jauges visuelles** pour chaque ressource
- **Panneau d'alertes** avec notifications prioritaires
- **Activité récente** des dernières actions

#### 📦 Inventaire
- **Liste des ressources** avec niveaux actuels
- **Ajustement des stocks** (Admin et Opérateur uniquement)
- **Indicateurs visuels** des seuils d'alerte
- **Historique des modifications**

#### 🚚 Distribution
- **Liste des demandes** triées par priorité
- **Création de nouvelles demandes** (tous les rôles)
- **Approbation/Rejet** des demandes (Admin et Opérateur uniquement)
- **Distribution effective** avec vérification des stocks

### 3. Gestion des ressources

#### Ajustement des stocks
**Permissions requises :** Admin ou Opérateur

1. Accédez à l'onglet "Inventaire"
2. Cliquez sur l'icône d'édition d'une ressource
3. Saisissez la quantité à ajouter ou retirer
4. Confirmez l'action

#### Création d'une demande de distribution
**Permissions requises :** Tous les rôles (Admin, Opérateur, Observateur)

1. Accédez à l'onglet "Distribution"
2. Cliquez sur "Nouvelle demande"
3. Remplissez le formulaire :
   - Ressource demandée
   - Demandeur
   - Quantité
   - Priorité
   - Motif
4. Soumettez la demande

#### Traitement des demandes
**Permissions requises :** Admin ou Opérateur

1. Consultez la liste des demandes en attente
2. Examinez les détails de chaque demande
3. Approuvez ou rejetez selon les critères
4. Procédez à la distribution si approuvée

## 🔧 Documentation technique

### Types de données

#### Resource
```typescript
interface Resource {
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
```

#### DistributionRequest
```typescript
interface DistributionRequest {
  id: string;
  resourceId: string;
  requestedBy: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  amount: number;
  purpose: string;
  status: 'pending' | 'approved' | 'distributed' | 'rejected';
  createdAt: Date;
}
```

#### User
```typescript
interface User {
  username: string;
  role: 'admin' | 'operator' | 'viewer';
  permissions: {
    canEdit: boolean;
    canCreateRequests: boolean;
    canApprove: boolean;
    canDistribute: boolean;
  };
}
```

### Système de permissions

| Rôle | Lecture | Modification stocks | Création demandes | Approbation | Distribution |
|------|---------|-------------------|------------------|-------------|--------------|
| **Admin** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Opérateur** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Observateur** | ✅ | ❌ | ✅ | ❌ | ❌ |

### Algorithme d'alertes

```typescript
const getAlertLevel = (resource: Resource): AlertLevel => {
  if (resource.currentAmount <= resource.criticalLevel) {
    return 'critical';
  }
  if (resource.currentAmount <= resource.warningLevel) {
    return 'warning';
  }
  return 'normal';
};
```

### Persistance des données

Les données sont automatiquement sauvegardées dans le localStorage :

```typescript
// Clés de stockage
const STORAGE_KEYS = {
  RESOURCES: 'resource_manager_resources',
  DISTRIBUTION_REQUESTS: 'resource_manager_distribution_requests',
  USER_SESSION: 'resource_manager_user_session'
};
```

## 🔒 Sécurité

### Authentification
- **Validation côté client** des identifiants
- **Gestion des sessions** avec timeout automatique
- **Contrôle d'accès** basé sur les rôles

### Protection des données
- **Validation des entrées** utilisateur
- **Sanitisation** des données affichées
- **Gestion d'erreurs** sécurisée

### Bonnes pratiques
- **Principe du moindre privilège** appliqué
- **Séparation des responsabilités** par rôle :
  - Les observateurs peuvent signaler des besoins via les demandes
  - Seuls les opérateurs et admins peuvent valider et distribuer
  - Les admins ont un contrôle total sur le système
- **Audit trail** des actions critiques

## 🎨 Interface utilisateur

### Design System
- **Palette de couleurs** adaptée aux situations d'urgence
- **Typographie** claire et lisible
- **Iconographie** intuitive avec Lucide React
- **Responsive design** pour tous les écrans

### Accessibilité
- **Contraste élevé** pour la lisibilité
- **Navigation au clavier** supportée
- **Indicateurs visuels** pour les daltoniens
- **Messages d'erreur** explicites

## 🧪 Tests et qualité

### Validation
- **ESLint** pour la qualité du code
- **TypeScript** pour la sécurité des types
- **Tests manuels** des fonctionnalités critiques

### Performance
- **Lazy loading** des composants
- **Optimisation des re-renders** avec React.memo
- **Bundle splitting** avec Vite

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Serveur statique
```bash
npm run preview
```

### Variables d'environnement
Aucune variable d'environnement requise pour la version actuelle.

## 🤝 Contribution

### Standards de code
- **TypeScript strict** activé
- **ESLint** configuration étendue
- **Prettier** pour le formatage
- **Conventional Commits** pour les messages

### Workflow de développement
1. Fork du repository
2. Création d'une branche feature
3. Développement avec tests
4. Pull request avec description détaillée

## 📝 Changelog

### Version 1.0.0 (2024)
- ✅ Système d'authentification à trois niveaux
- ✅ Tableau de bord avec métriques en temps réel
- ✅ Gestion complète de l'inventaire
- ✅ Workflow de distribution des ressources
- ✅ Système d'alertes automatiques
- ✅ Persistance localStorage
- ✅ Interface responsive

## 📞 Support

Pour toute question ou problème :
- Consultez la documentation technique
- Vérifiez les logs de la console navigateur
- Contactez l'équipe de développement

## 📄 Licence

Ce projet est sous licence propriétaire. Tous droits réservés.

---

**Développé avec ❤️ pour la sécurité et la gestion des ressources critiques**
About
No description, website, or topics provided.
Resources
 Readme
 Activity
Stars
 0 stars
Watchers
 0 watching
Forks
 0 forks
Releases
No releases published
Create a new release
Packages
No packages published
Publish your first package
Contributors
3
@Damiendm50540
Damiendm50540 damien de Montgolfier
@Aichatou270
Aichatou270
@Max851-tech
Max851-tech
Languages
TypeScript
98.0%
 
JavaScript
1.4%
 
Other
0.6%
Suggested workflows
Based on your tech stack
Gulp logo
Gulp
Build a NodeJS project with npm and gulp.
SLSA Generic generator logo
SLSA Generic generator
Generate SLSA3 provenance for your existing release workflows
Grunt logo
Grunt
Build a NodeJS project with npm and grunt.
More workflows
Footer
