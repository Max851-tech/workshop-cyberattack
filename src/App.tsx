import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Distribution from './components/Distribution';
import UserManagement from './components/UserManagement';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import UserBar from './components/UserBar';
import { ResourceProvider } from './context/ResourceContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'distribution':
        return <Distribution />;
      case 'users':
        return <UserManagement />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <UserBar />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-6">
        {renderActiveTab()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ResourceProvider>
        <AppContent />
      </ResourceProvider>
    </AuthProvider>
  );
}

export default App;