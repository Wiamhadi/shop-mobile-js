//Shop Mobile App

Application mobile e-commerce développée avec React Native (Expo), Node.js, Express et MongoDB Atlas.
Elle permet aux utilisateurs de s’inscrire, se connecter, consulter des produits, gérer un panier et simuler un achat.

//Fonctionnalités

👤 Authentification
Inscription utilisateur (MongoDB)
Connexion sécurisée (bcrypt)
Gestion utilisateur via Context API
Profil dynamique (nom, email)
🛒 Produits
Liste de produits depuis API Node.js
Détails produit
Navigation produit → détail
🛍 Panier
Ajouter / supprimer produits
Augmenter / diminuer quantité
Calcul automatique du total
Bouton “Payer” (simulation)
📱 Interface
Navigation avec React Navigation
UI simple et responsive
Gestion d’état globale (Context API)
🧱 Stack technique
Frontend
React Native (Expo)
React Navigation
Context API
Fetch API
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
bcryptjs

// Structure du projet
shop-mobile-js/
│
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── cart.js
│   └── server.js
│
├── context/
│   ├── AuthContext.js
│   └── CartContext.js
│
├── screens/
│   ├── Login.js
│   ├── Register.js
│   ├── Home.js
│   ├── Product.js
│   ├── Cart.js
│   └── Profile.js
│
└── App.js

//Installation

1. Backend
cd backend
npm install
node server.js

📌 Backend tourne sur :

http://localhost:5000
2. Frontend (Expo)

npm install
npx expo start
🔌 Configuration API

Dans le frontend, remplace l’IP par ton IP locale :

http://172.16.18.85:5000
🧠 Base de données MongoDB

//Collections :

users
products
cart (optionnel)
🔐 Auth Flow
Register → MongoDB
Login → vérification bcrypt
Backend retourne user
Context stocke user
App affiche Home
🛒 Cart Flow
addToCart(product)
increaseQty / decreaseQty
removeFromCart
total calculé dynamiquement
