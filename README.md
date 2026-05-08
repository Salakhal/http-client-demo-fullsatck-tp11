# TP 11 : Communication HTTP entre Frontend et Backend avec Fetch et Axios

## 📋 Description

Ce projet démontre les différentes façons de communiquer entre un frontend React et un backend REST API en utilisant deux approches principales :

- **Fetch API** : L'API native des navigateurs modernes
- **Axios** : Une bibliothèque HTTP populaire avec des fonctionnalités avancées

## 🎯 Objectifs pédagogiques

- Comprendre les différences entre Fetch et Axios
- Maîtriser les requêtes HTTP (GET, POST, PUT, DELETE)
- Gérer les erreurs et les timeouts
- Implémenter des fonctionnalités avancées (upload de fichiers, annulation de requêtes)
- Créer des intercepteurs et des instances personnalisées
- Développer des hooks React personnalisés pour les requêtes HTTP

## 🛠️ Technologies utilisées

- **Frontend** : React 18
- **HTTP Clients** : Fetch API, Axios
- **Backend (mock)** : JSON Server
- **Styles** : CSS personnalisé

## 📁 Structure du projet
```
http-client-demo/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── FetchDemo/
│   │   │   ├── FetchBasic.js
│   │   │   ├── FetchAdvanced.js
│   │   │   └── FetchUpload.js
│   │   ├── AxiosDemo/
│   │   │   ├── AxiosBasic.js
│   │   │   └── AxiosAdvanced.js
│   │   └── Auth/
│   │       └── Login.js
│   ├── hooks/
│   │   └── useFetch.js
│   ├── services/
│   │   ├── api.js
│   │   ├── axiosInstance.js
│   │   ├── authService.js
│   │   └── cacheService.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── db.json
└── package.json

```

## 🚀 Installation

### Prérequis

- Node.js (version 14+ recommandée)
- npm ou yarn

### Étapes d'installation


# 1. Cloner ou créer le projet
```
npx create-react-app http-client-demo
cd http-client-demo
```
# 2. Installer les dépendances
```
npm install axios
```
# 3. Installer JSON Server globalement
```
npm install -g json-server
```
# 4. Copier tous les fichiers du projet dans les dossiers correspondants

# 5. Démarrer le serveur JSON (dans un terminal)
```
json-server --watch db.json --port 3001
```

# 6. Démarrer l'application React (dans un autre terminal)
```
npm start
```

# 🔑 Identifiants de démonstration

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| alice@example.com | password | 👑 Administrateur |
| bob@example.com | password | 👤 Utilisateur |
| charlie@example.com | password | 👤 Utilisateur |

---

# 📚 Fonctionnalités démontrées

## 📡 API Fetch

### 🔹 Fetch Basique

| Fonctionnalité | Statut |
|----------------|--------|
| Requêtes GET pour récupérer les utilisateurs | ✅ |
| Requêtes POST pour ajouter des utilisateurs | ✅ |
| Requêtes DELETE pour supprimer des utilisateurs | ✅ |
| Gestion des erreurs HTTP | ✅ |
| États de chargement | ✅ |

### 🔹 Fetch Avancé

| Fonctionnalité | Statut |
|----------------|--------|
| Timeout avec AbortController | ✅ |
| Requêtes parallèles avec Promise.all | ✅ |
| Récupération de données relationnelles (posts + auteurs + commentaires) | ✅ |
| Gestion avancée des erreurs | ✅ |

### 🔹 Upload avec Fetch

| Fonctionnalité | Statut |
|----------------|--------|
| Upload de fichiers avec FormData | ✅ |
| Prévisualisation d'images | ✅ |
| Simulation de progression (solution alternative) | ✅ |

---

## 🚀 Axios

### 🔹 Axios Basique

| Fonctionnalité | Statut |
|----------------|--------|
| CRUD complet sur les posts | ✅ |
| Configuration d'instance personnalisée | ✅ |
| Intercepteurs de requêtes/réponses | ✅ |
| Parsing automatique du JSON | ✅ |

### 🔹 Axios Avancé

| Fonctionnalité | Statut |
|----------------|--------|
| Annulation de requêtes avec CancelToken | ✅ |
| Upload avec suivi de progression (onUploadProgress) | ✅ |
| Requêtes parallèles | ✅ |
| Gestion globale des erreurs HTTP (401, 403, 404, 500) | ✅ |

---

## 🔧 Fonctionnalités transversales

| Fonctionnalité | Statut |
|----------------|--------|
| Service d'authentification simulé | ✅ |
| Système de cache pour les requêtes | ✅ |
| Hook personnalisé `useFetch` | ✅ |
| Interface utilisateur responsive | ✅ |
| Thème moderne avec dégradés | ✅ |

---

## 📊 Résumé des fonctionnalités par composant

### Composants Fetch

| Composant | Fonctionnalités principales |
|-----------|----------------------------|
| `FetchBasic.js` | GET, POST, DELETE, gestion d'erreurs, états de chargement |
| `FetchAdvanced.js` | Timeout, AbortController, Promise.all, données relationnelles |
| `FetchUpload.js` | FormData, prévisualisation, progression simulée |

### Composants Axios

| Composant | Fonctionnalités principales |
|-----------|----------------------------|
| `AxiosBasic.js` | CRUD complet, instance personnalisée, intercepteurs |
| `AxiosAdvanced.js` | CancelToken, upload progressif, requêtes parallèles |

### Services utilitaires

| Service | Fonctionnalités |
|---------|----------------|
| `api.js` | Service générique avec Fetch, timeout, gestion d'erreurs |
| `axiosInstance.js` | Instance Axios configurée, intercepteurs |
| `authService.js` | Login, logout, token storage |
| `cacheService.js` | Cache avec TTL, nettoyage automatique |

### Hooks personnalisés

| Hook | Fonctionnalités |
|------|----------------|
| `useFetch.js` | Auto-load, annulation, re-exécution manuelle |

---

## 🎯 Objectifs atteints

- ✅ Comprendre les différences entre Fetch et Axios
- ✅ Maîtriser les requêtes HTTP (GET, POST, PUT, DELETE)
- ✅ Gérer les erreurs et les timeouts
- ✅ Implémenter des fonctionnalités avancées (upload, annulation)
- ✅ Créer des intercepteurs et instances personnalisées
- ✅ Développer des hooks React personnalisés

---

## 🏆 Points forts du projet

1. **Architecture modulaire** - Séparation claire des préoccupations
2. **Réutilisabilité** - Services et hooks réutilisables
3. **Expérience utilisateur** - Indicateurs de chargement, messages d'erreur
4. **Modernité** - ES6+, async/await, composants fonctionnels
5. **Documentation** - Code commenté et structuré
   
 ##  Flux de données
```

┌─────────────┐     HTTP      ┌─────────────┐
│   Frontend  │ ◄──────────► │  JSON       │
│   (React)   │    Request    │  Server     │
└─────────────┘               │  (:3001)    │
      │                       └─────────────┘
      │                              │
      ▼                              ▼
┌─────────────┐               ┌─────────────┐
│   Fetch /   │               │   db.json   │
│   Axios     │               │  (données)  │
└─────────────┘               └─────────────┘
```
# 🎯 Conclusion

## Synthèse du TP

Ce TP vous a permis de maîtriser les **deux principales méthodes de communication HTTP** en JavaScript :

### 📡 Fetch API
La solution **native**, **légère** et **moderne**
- ✅ Intégrée directement dans les navigateurs
- ✅ Basée sur les Promises
- ✅ Supporte async/await
- ✅ Aucune dépendance externe nécessaire

### 🚀 Axios
La bibliothèque **puissante** avec des **fonctionnalités avancées**
- ✅ API plus intuitive et concise
- ✅ Intercepteurs pour la gestion globale
- ✅ Annulation de requêtes intégrée
- ✅ Suivi de progression des uploads
- ✅ Timeout natif
- ✅ Fonctionne dans Node.js et les navigateurs

---

## 📚 Compétences acquises

### Requêtes HTTP
| Méthode | Fetch | Axios | Statut |
|---------|-------|-------|--------|
| GET | `fetch(url)` | `axios.get(url)` | ✅ Maîtrisé |
| POST | `fetch(url, { method: 'POST', body })` | `axios.post(url, data)` | ✅ Maîtrisé |
| PUT | `fetch(url, { method: 'PUT', body })` | `axios.put(url, data)` | ✅ Maîtrisé |
| DELETE | `fetch(url, { method: 'DELETE' })` | `axios.delete(url)` | ✅ Maîtrisé |

### Gestion avancée
| Fonctionnalité | Niveau |
|----------------|--------|
| Gestion des erreurs HTTP | ✅ Avancé |
| Timeouts et annulation | ✅ Avancé |
| Requêtes parallèles (Promise.all) | ✅ Avancé |
| Upload de fichiers avec progression | ✅ Avancé |
| Intercepteurs de requêtes/réponses | ✅ Avancé |

### Architecture React
| Concept | Maîtrise |
|---------|----------|
| Hooks personnalisés (`useFetch`) | ✅ |
| Services réutilisables | ✅ |
| Gestion d'état avec useState | ✅ |
| Effets avec useEffect | ✅ |
| Composants fonctionnels | ✅ |

---

 ## 🎥 Démo du Projet









## 👤 Auteur

* **École Normale Supérieure de Marrakech**
  
* **Réalisé par :** SALMA LAKHAL
  
* **Filière  :** CLE_INFO_S5

  
* **Encadré par :** Pr. Mohamed LACHGAR

* **Cours :** `Développement web full-stack avec JavaScript

