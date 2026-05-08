import React, { useState } from 'react';
import './App.css';
import FetchBasic from './components/FetchDemo/FetchBasic';
import FetchAdvanced from './components/FetchDemo/FetchAdvanced';
import FetchUpload from './components/FetchDemo/FetchUpload';
import AxiosBasic from './components/AxiosDemo/AxiosBasic';
import AxiosAdvanced from './components/AxiosDemo/AxiosAdvanced';
import Login from './components/Auth/Login';

function App() {
  const [activeTab, setActiveTab] = useState('fetch-basic');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setTimeout(() => {
      setActiveTab('fetch-basic');
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    switch (activeTab) {
      case 'fetch-basic':
        return <FetchBasic />;
      case 'fetch-advanced':
        return <FetchAdvanced />;
      case 'fetch-upload':
        return <FetchUpload />;
      case 'axios-basic':
        return <AxiosBasic />;
      case 'axios-advanced':
        return <AxiosAdvanced />;
      default:
        return <FetchBasic />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌐 Communication HTTP Frontend-Backend</h1>
        <p>Démonstration de l'API Fetch et d'Axios</p>
        {isAuthenticated && user && (
          <div className="user-info">
            👋 Bonjour, <strong>{user.name}</strong> ({user.role === 'admin' ? '👑 Admin' : '👤 User'})
            <button onClick={handleLogout} className="logout-btn">🚪 Déconnexion</button>
          </div>
        )}
      </header>

      {isAuthenticated && (
        <nav className="App-nav">
          <div className="nav-section">
            <h3>📡 API Fetch</h3>
            <button
              className={activeTab === 'fetch-basic' ? 'active' : ''}
              onClick={() => setActiveTab('fetch-basic')}
            >
              📋 Basique
            </button>
            <button
              className={activeTab === 'fetch-advanced' ? 'active' : ''}
              onClick={() => setActiveTab('fetch-advanced')}
            >
              ⚙️ Avancé
            </button>
            <button
              className={activeTab === 'fetch-upload' ? 'active' : ''}
              onClick={() => setActiveTab('fetch-upload')}
            >
              📤 Upload
            </button>
          </div>

          <div className="nav-section">
            <h3>🚀 Axios</h3>
            <button
              className={activeTab === 'axios-basic' ? 'active' : ''}
              onClick={() => setActiveTab('axios-basic')}
            >
              📝 Basique
            </button>
            <button
              className={activeTab === 'axios-advanced' ? 'active' : ''}
              onClick={() => setActiveTab('axios-advanced')}
            >
              ⚡ Avancé
            </button>
          </div>
        </nav>
      )}

      <main className="App-content">
        {renderContent()}
      </main>

      <footer className="App-footer">
        <p>
          🎓 TP 11: Communication HTTP entre Frontend et Backend avec Fetch et Axios
        </p>
        <p>Développement web full-stack avec JavaScript</p>
      </footer>
    </div>
  );
}

export default App;