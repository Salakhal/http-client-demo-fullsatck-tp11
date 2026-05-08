import React, { useState } from 'react';
import authService from '../../services/authService';

function Login({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const user = await authService.login(credentials.email, credentials.password);
      setSuccess(true);
      if (onLoginSuccess) {
        setTimeout(() => onLoginSuccess(user), 1500);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>🔐 Connexion</h2>
  
      
      {success ? (
        <div className="success-message">
          ✅ Connexion réussie! Redirection...
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div>
            <label htmlFor="email">📧 Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password">🔒 Mot de passe:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;