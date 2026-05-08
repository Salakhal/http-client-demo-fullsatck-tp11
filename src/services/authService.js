import api from './axiosInstance';

const TOKEN_KEY = 'auth_token';

const authService = {
  login: async (email, password) => {
    try {
      // Simulation d'un appel API - dans un projet réel, utilisez votre endpoint
      // const response = await api.post('/auth/login', { email, password });
      
      // Simulation pour la démonstration
      let user = null;
      
      if (email === 'alice@example.com' && password === 'password') {
        const fakeToken = 'fake-jwt-token-' + Date.now();
        localStorage.setItem(TOKEN_KEY, fakeToken);
        user = { id: 1, name: 'Alice Dupont', email: 'alice@example.com', role: 'admin' };
      } else if (email === 'bob@example.com' && password === 'password') {
        const fakeToken = 'fake-jwt-token-' + Date.now();
        localStorage.setItem(TOKEN_KEY, fakeToken);
        user = { id: 2, name: 'Bob Martin', email: 'bob@example.com', role: 'user' };
      } else if (email === 'charlie@example.com' && password === 'password') {
        const fakeToken = 'fake-jwt-token-' + Date.now();
        localStorage.setItem(TOKEN_KEY, fakeToken);
        user = { id: 3, name: 'Charlie Durand', email: 'charlie@example.com', role: 'user' };
      } else {
        throw new Error('Email ou mot de passe incorrect');
      }
      
      return user;
    } catch (error) {
      throw new Error(error.message || 'Échec de la connexion');
    }
  },
  
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
  
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  getCurrentUser: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    
    // Décode le token (simulation)
    try {
      // Dans un vrai projet, décodez le JWT
      return { name: 'Utilisateur' };
    } catch {
      return null;
    }
  },
  
  getProfile: async () => {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Échec de la récupération du profil');
    }
  }
};

export default authService;