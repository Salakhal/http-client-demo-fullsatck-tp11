import axios from 'axios';

// Création d'une instance Axios avec une configuration par défaut
const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur de requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`[Axios Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[Axios Request Error]', error);
    return Promise.reject(error);
  }
);

// Intercepteur de réponses
api.interceptors.response.use(
  (response) => {
    console.log(`[Axios Response] Status: ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`[Axios Error] Status: ${error.response.status}`, error.response.data);
      
      switch (error.response.status) {
        case 401:
          console.log('Utilisateur non authentifié');
          if (window.location.pathname !== '/login') {
            localStorage.removeItem('token');
          }
          break;
        case 403:
          console.log('Accès interdit');
          break;
        case 404:
          console.log('Ressource non trouvée');
          break;
        case 500:
          console.log('Erreur serveur');
          break;
        default:
          break;
      }
    } else if (error.request) {
      console.error('[Axios Error] No response received', error.request);
    } else {
      console.error('[Axios Error] Request configuration', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;