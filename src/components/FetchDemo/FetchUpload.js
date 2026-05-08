import React, { useState } from 'react';

function FetchUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const uploadWithFetch = async () => {
    if (!file) {
      setUploadStatus('Veuillez sélectionner un fichier');
      return;
    }

    setUploadStatus('uploading');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      // Simulation de progression (car Fetch ne supporte pas nativement le suivi)
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(i);
      }

      setUploadStatus('success');
      setTimeout(() => {
        setUploadStatus(null);
        setUploadProgress(0);
        setFile(null);
        setPreview(null);
      }, 3000);
    } catch (error) {
      setUploadStatus(`Erreur: ${error.message}`);
    }
  };

  const uploadWithXHR = () => {
    if (!file) {
      setUploadStatus('Veuillez sélectionner un fichier');
      return;
    }

    setUploadStatus('uploading');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded * 100) / event.total);
        setUploadProgress(progress);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setUploadStatus('success');
        setTimeout(() => {
          setUploadStatus(null);
          setUploadProgress(0);
          setFile(null);
          setPreview(null);
        }, 3000);
      } else {
        setUploadStatus(`Erreur: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener('error', () => {
      setUploadStatus('Erreur de connexion');
    });

    xhr.open('POST', 'https://httpbin.org/post');
    xhr.send(formData);
  };

  return (
    <div className="fetch-upload">
      <h2>📤 Téléversement de fichiers (Fetch)</h2>
      
      <div className="upload-form">
        <div className="file-input">
          <label htmlFor="file">📁 Sélectionner un fichier:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            disabled={uploadStatus === 'uploading'}
          />
        </div>
        
        {file && (
          <div className="file-info">
            <p>📄 Fichier: {file.name}</p>
            <p>📋 Type: {file.type || 'Inconnu'}</p>
            <p>📏 Taille: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}
        
        {preview && (
          <div className="preview">
            <h4>🖼️ Aperçu:</h4>
            <img src={preview} alt="Aperçu" style={{ maxWidth: '200px', maxHeight: '200px' }} />
          </div>
        )}
        
        <div className="upload-buttons">
          <button
            onClick={uploadWithFetch}
            disabled={!file || uploadStatus === 'uploading'}
          >
            🚀 Upload avec Fetch
          </button>
          <button
            onClick={uploadWithXHR}
            disabled={!file || uploadStatus === 'uploading'}
          >
            📊 Upload avec progression (XHR)
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
          <div className="success-message">✅ Fichier téléversé avec succès!</div>
        )}
        
        {uploadStatus && uploadStatus !== 'uploading' && uploadStatus !== 'success' && (
          <div className="error-message">{uploadStatus}</div>
        )}
      </div>
    </div>
  );
}

export default FetchUpload;