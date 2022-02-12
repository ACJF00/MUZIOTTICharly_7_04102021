# Projet 7 - Groupomania - OpenClassRooms
Groupomania est le dernière projet de la formation "Développeur Web" de OpenClassRooms, le but étant de créer un réseau social interne à une entreprise

## Getting Started
Ces instructions vous permettront de mettre en place une copie du projet en local à des fins de développement et de test. Voir déploiement pour des notes sur la façon de déployer le projet sur un système actif.

## Prérequis
Les éléments dont vous avez besoin pour installer le logiciel et comment les installer

**Base de données MYSQL :**

> Veuillez demander le fichier .env pour vous connecter à la BDD


## Installation

- Importer le fichier SQL fourni avec Mysql Workbench
- Cloner le projet Github

**Frontend :**
- Aller sur votre terminal 
- cd frontend 
- npm install
- npm run serve

> ATTENTION : Il ne faut pas fermer ce terminal

**Backend (ouvrir un nouveau terminal) :**
- cd backend
- npm install
- sequelize db:create Lancer le serveur côté backend : npm start Garder ce terminal ouvert durant toute votre session sur le site

> ATTENTION : Il ne faut pas fermer ce terminal


**Accéder au site**

- http://localhost:8080

## Tests

- Créez un compte
- Interagissez avec le réseau social
   - Création de posts (avec ou sans images)
   - Création de commentaires
   - Modification de la biographie
   - Suppression de votre contenu
- Vous pouvez paramétrer un administrateur dans MySQL Workbench pour avoir accès aux fonctionnalités suivantes :
  - Suppression de posts
  - Suppression de commentaires
  - Suppression d'utilisateurs

## Construit avec
- NodeJS
- VueJS


## Authors
Charly
