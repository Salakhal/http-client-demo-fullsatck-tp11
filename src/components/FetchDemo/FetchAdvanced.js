import React, { useState } from 'react';

function FetchAdvanced() {
  const [postId, setPostId] = useState('');
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeoutEnabled, setTimeoutEnabled] = useState(true);
  const [timeoutDuration, setTimeoutDuration] = useState(5000);

  const fetchAuthor = async (authorId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${authorId}`);
      if (!response.ok) return { name: 'Auteur inconnu' };
      return await response.json();
    } catch (error) {
      console.error('Erreur auteur:', error);
      return { name: 'Auteur inconnu' };
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/comments?postId=${postId}`);
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      console.error('Erreur commentaires:', error);
      return [];
    }
  };

  const fetchPostWithTimeout = async () => {
    if (!postId.trim()) {
      setError('Veuillez entrer un ID de post');
      return;
    }

    setLoading(true);
    setError(null);
    setPost(null);

    const controller = new AbortController();
    const { signal } = controller;

    let timeoutId;
    if (timeoutEnabled) {
      timeoutId = setTimeout(() => {
        controller.abort();
      }, timeoutDuration);
    }

    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, { signal });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Le post avec l'ID ${postId} n'existe pas`);
        }
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setPost(data);
    } catch (err) {
      if (err.name === 'AbortError') {
        setError(`⏱️ La requête a expiré après ${timeoutDuration / 1000} secondes`);
      } else {
        setError(`❌ Erreur: ${err.message}`);
      }
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const fetchPostDetails = async () => {
    if (!postId.trim()) {
      setError('Veuillez entrer un ID de post');
      return;
    }

    setLoading(true);
    setError(null);
    setPost(null);

    try {
      const postResponse = await fetch(`http://localhost:3001/posts/${postId}`);
      
      if (!postResponse.ok) {
        if (postResponse.status === 404) {
          throw new Error(`Le post avec l'ID ${postId} n'existe pas`);
        }
        throw new Error(`Erreur HTTP: ${postResponse.status}`);
      }
      
      const postData = await postResponse.json();
      
      const [author, comments] = await Promise.all([
        fetchAuthor(postData.author),
        fetchComments(postData.id)
      ]);
      
      setPost({
        ...postData,
        authorDetails: author,
        comments
      });
    } catch (err) {
      setError(`❌ Erreur: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fetch-advanced">
      <h2>🔍 Récupération de post (Fetch avancé)</h2>
      
      <div className="controls">
        <div>
          <label htmlFor="postId">ID du post (1-3):</label>
          <input
            type="number"
            id="postId"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            min="1"
            max="3"
            placeholder="Entrez 1, 2 ou 3"
          />
        </div>
        
        <div className="timeout-controls">
          <label>
            <input
              type="checkbox"
              checked={timeoutEnabled}
              onChange={(e) => setTimeoutEnabled(e.target.checked)}
            />
            ⏱️ Activer le timeout
          </label>
          
          {timeoutEnabled && (
            <div>
              <label htmlFor="timeoutDuration">Durée (ms):</label>
              <input
                type="number"
                id="timeoutDuration"
                value={timeoutDuration}
                onChange={(e) => setTimeoutDuration(Number(e.target.value))}
                min="100"
                step="100"
              />
            </div>
          )}
        </div>
        
        <div className="buttons">
          <button onClick={fetchPostWithTimeout} disabled={loading}>
            {loading ? 'Chargement...' : 'Récupérer (avec timeout)'}
          </button>
          <button onClick={fetchPostDetails} disabled={loading}>
            {loading ? 'Chargement...' : 'Récupérer avec détails'}
          </button>
        </div>
      </div>
      
      {loading && <div className="loading">⏳ Chargement...</div>}
      {error && <div className="error">{error}</div>}
      
      {post && (
        <div className="post-details">
          <h3>📝 {post.title}</h3>
          {post.authorDetails && (
            <p className="author">✍️ Par: {post.authorDetails.name}</p>
          )}
          <p className="content">{post.content}</p>
          
          {post.comments && post.comments.length > 0 && (
            <div className="comments">
              <h4>💬 Commentaires ({post.comments.length})</h4>
              <ul>
                {post.comments.map(comment => (
                  <li key={comment.id}>🗨️ {comment.text}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FetchAdvanced;