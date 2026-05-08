import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import api from '../../services/axiosInstance';

function AxiosAdvanced() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [file, setFile] = useState(null);
  
  const cancelTokenRef = useRef(null);
  
  useEffect(() => {
    return () => {
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel('Composant démonté');
      }
    };
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Veuillez entrer un terme de recherche');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('Nouvelle recherche lancée');
    }
    
    cancelTokenRef.current = axios.CancelToken.source();
    
    try {
      const response = await api.get(`/posts?q=${searchTerm}`, {
        cancelToken: cancelTokenRef.current.token
      });
      
      setSearchResults(response.data);
      if (response.data.length === 0) {
        setError('Aucun résultat trouvé');
      }
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError(`Erreur: ${err.message}`);
      } else {
        console.log('Recherche annulée');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadProgress(0);
    setUploadStatus(null);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setUploadStatus('Veuillez sélectionner un fichier');
      return;
    }
    
    setUploadStatus('uploading');
    setUploadProgress(0);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      await axios.post('https://httpbin.org/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });
      
      setUploadStatus('success');
      setTimeout(() => {
        setUploadStatus(null);
        setUploadProgress(0);
        setFile(null);
      }, 3000);
    } catch (err) {
      setUploadStatus(`Erreur: ${err.message}`);
    }
  };

  const cancelSearch = () => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('Recherche annulée par l\'utilisateur');
      setLoading(false);
    }
  };

  const fetchMultipleResources = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [usersRes, postsRes, commentsRes] = await Promise.all([
        api.get('/users'),
        api.get('/posts'),
        api.get('/comments')
      ]);
      
      console.log('📊 Résultats des requêtes parallèles:');
      console.log(`👥 Utilisateurs: ${usersRes.data.length}`);
      console.log(`📝 Posts: ${postsRes.data.length}`);
      console.log(`💬 Commentaires: ${commentsRes.data.length}`);
      
      setError(`✅ Succès! ${usersRes.data.length} utilisateurs, ${postsRes.data.length} posts, ${commentsRes.data.length} commentaires. Voir console.`);
    } catch (err) {
      setError(`❌ Erreur: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="axios-advanced">
      <h2>⚡ Fonctionnalités avancées d'Axios</h2>
      
      <div className="search-section">
        <h3>🔍 Recherche avec annulation</h3>
        <div className="search-controls">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher des posts..."
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} disabled={loading}>
            🔍 Rechercher
          </button>
          <button onClick={cancelSearch} disabled={!loading}>
            ❌ Annuler
          </button>
        </div>
        
        {loading && <div className="loading">⏳ Recherche en cours...</div>}
        {error && <div className="error">{error}</div>}
        
        {searchResults.length > 0 && (
          <div className="search-results">
            <h4>📋 Résultats ({searchResults.length})</h4>
            <ul>
              {searchResults.map(result => (
                <li key={result.id}>
                  <strong>{result.title}</strong>
                  <p>{result.content.substring(0, 100)}...</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="upload-section">
        <h3>📤 Upload avec progression</h3>
        <div className="upload-controls">
          <input
            type="file"
            onChange={handleFileChange}
            disabled={uploadStatus === 'uploading'}
          />
          <button
            onClick={handleFileUpload}
            disabled={!file || uploadStatus === 'uploading'}
          >
            📁 Uploader
          </button>
        </div>
        
        {uploadStatus === 'uploading' && (
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="progress-text">{uploadProgress}%</div>
          </div>
        )}
        
        {uploadStatus === 'success' && (
          <div className="success-message">✅ Fichier uploadé avec succès!</div>
        )}
        
        {uploadStatus && uploadStatus !== 'uploading' && uploadStatus !== 'success' && (
          <div className="error-message">{uploadStatus}</div>
        )}
      </div>
      
      <div className="parallel-section">
        <h3>⏱️ Requêtes parallèles</h3>
        <button onClick={fetchMultipleResources} disabled={loading}>
          🚀 Récupérer toutes les ressources
        </button>
      </div>
    </div>
  );
}

export default AxiosAdvanced;