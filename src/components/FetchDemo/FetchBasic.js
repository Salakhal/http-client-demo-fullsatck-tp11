import React, { useState, useEffect } from 'react';

function FetchBasic() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
  const [addStatus, setAddStatus] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:3001/users');
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(`Erreur lors de la récupération des utilisateurs: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddStatus('pending');
    
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }
      
      const addedUser = await response.json();
      setUsers(prevUsers => [...prevUsers, addedUser]);
      setNewUser({ name: '', email: '', role: 'user' });
      setAddStatus('success');
      
      setTimeout(() => setAddStatus(''), 3000);
    } catch (err) {
      setAddStatus('error');
      setError(`Erreur lors de l'ajout: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return;
    
    try {
      const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (err) {
      setError(`Erreur lors de la suppression: ${err.message}`);
    }
  };

  if (loading) return <div className="loading">⏳ Chargement des utilisateurs...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="fetch-basic">
      <h2>📋 Liste des utilisateurs (Fetch basique)</h2>
      
      <div className="users-list">
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <strong>{user.name}</strong><br />
              <span className="email">📧 {user.email}</span><br />
              <span className="role">👤 Rôle: {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}</span>
              <button 
                className="delete-btn small"
                onClick={() => handleDelete(user.id)}
              >
                🗑️ Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="add-user-form">
        <h3>➕ Ajouter un utilisateur</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nom:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              required
              placeholder="Nom complet"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              required
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label htmlFor="role">Rôle:</label>
            <select
              id="role"
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <option value="user">👤 Utilisateur</option>
              <option value="admin">👑 Administrateur</option>
            </select>
          </div>
          <button type="submit" disabled={addStatus === 'pending'}>
            {addStatus === 'pending' ? 'Ajout en cours...' : 'Ajouter'}
          </button>
          {addStatus === 'success' && (
            <div className="success-message">✅ Utilisateur ajouté avec succès!</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default FetchBasic;