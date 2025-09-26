import { useState } from 'react';
import { Lock, User, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoUsername: string, demoPassword: string) => {
    setUsername(demoUsername);
    setPassword(demoPassword);
    setIsLoading(true);
    setError('');

    try {
      const success = await login(demoUsername, demoPassword);
      if (!success) {
        setError('Erreur de connexion démo');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-white">Système de Cyberdéfense</h2>
          <p className="mt-2 text-slate-400">Centre de Gestion des Ressources Critiques</p>
        </div>

        {/* Demo Credentials Info */}
        <div className="bg-slate-800 rounded-lg p-4">
          <button
            onClick={() => setShowCredentials(!showCredentials)}
            className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Voir les identifiants de démonstration
          </button>
          
          {showCredentials && (
            <div className="mt-3 space-y-2 text-sm">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleDemoLogin('admin', 'admin123')}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors"
                  disabled={isLoading}
                >
                  Admin
                </button>
                <button
                  onClick={() => handleDemoLogin('operator', 'operator123')}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded transition-colors"
                  disabled={isLoading}
                >
                  Opérateur
                </button>
                <button
                  onClick={() => handleDemoLogin('viewer', 'viewer123')}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition-colors"
                  disabled={isLoading}
                >
                  Observateur
                </button>
              </div>
              <div className="text-xs text-slate-400 mt-2">
                <p><strong>Admin:</strong> Accès complet (admin/admin123)</p>
                <p><strong>Opérateur:</strong> Gestion des ressources (operator/operator123)</p>
                <p><strong>Observateur:</strong> Lecture seule (viewer/viewer123)</p>
              </div>
            </div>
          )}
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                Nom d'utilisateur
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Entrez votre nom d'utilisateur"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Entrez votre mot de passe"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-3 text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        {/* Security Notice */}
        <div className="text-center text-xs text-slate-500">
          <p>Système sécurisé - Accès restreint au personnel autorisé</p>
        </div>
      </div>
    </div>
  );
}