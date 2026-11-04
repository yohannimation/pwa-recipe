# Plan de réalisation — API Recettes NestJS + Fastify

Vue d'ensemble de l'architecture
Voici le plan structuré pour construire cette API, étape par étape.

## 🗂️ 1. Structure du projet

```
src/

├── common/
│   ├── decorators/        # @Roles(), @CurrentUser()
│   ├── guards/            # RolesGuard, JwtAuthGuard
│   ├── pipes/             # ValidationPipe
│   └── enums/             # Role enum
├── config/                # Config DB, JWT, FatSecret
├── module/
│   ├── auth/              # JWT, stratégies, guards
│   ├── users/             # CRUD utilisateurs
│   ├── recipes/           # CRUD recettes + recherche
│   ├── categories/        # CRUD catégories + recherche
│   ├── ingredients/       # CRUD ingrédients + FatSecret API
│   └── steps/             # CRUD étapes
└── upload/                # Gestion images + compression
```

## 📦 2. Stack technique & dépendances

- Framework : @nestjs/platform-fastify
- ORM : @nestjs/typeorm + typeorm + pg (PostgreSQL)
- Auth : @nestjs/jwt + @nestjs/passport + passport-jwt
- Hashage : bcrypt
- Validation : class-validator + class-transformer
- Images : sharp (compression) + @fastify/multipart
- Config : @nestjs/config
- FatSecret : axios ou @nestjs/axios + OAuth1

## 🗃️ 3. Base de données & entités

### Entités à créer

- User — id (uuid), username (unique), password (bcrypt), role (admin | chef), createdAt, updatedAt
- Recipe — id (number), name, imageName, preparationTime, cookTime, numberPeople, createdAt, updatedAt
- Category — id (number), idParent (nullable, auto-référence), name (unique), createdAt, updatedAt
- Ingredient — id (number), idApi, quantity, unit, createdAt, updatedAt
- Step — id (number), stepNumber, description, createdAt, updatedAt

### Relations

```
User        1 ──< * Recipe       (un chef possède plusieurs recettes)
Recipe      * >──< * Category    (ManyToMany — table pivot)
Recipe      1 ──< * Ingredient
Recipe      1 ──< * Step
Category    * >── 1 Category     (auto-référence idParent)
```

## 🔐 4. Authentification & autorisation

### 4.1 — Auth module

- `POST /auth/register` — création compte (rôle `chef` par défaut)
- `POST /auth/login` — retourne `access_token` JWT

### 4.2 — JWT Strategy

Passport strategy qui extrait et valide le token
Payload : `{ sub: userId, username, role }`

### 4.3 — Roles & Guards

```
Enum Role: ADMIN | CHEF
@Roles('admin')          ← décorateur custom (SetMetadata)
@UseGuards(JwtAuthGuard, RolesGuard)  ← sur les routes protégées
```

### 4.4 — Matrice des permissions

| Action                     | Public | Chef | Admin |
|----------------------------|--------|------|-------|
| Lire recettes/catégories   | yes    | yes  | yes   |
| Créer recette              | no     | yes  | yes   |
| Modifier sa propre recette | no     | yes  | yes   |
| Modifier toute recette     | no     | no   | yes   |
| CRUD catégories            | no     | no   | yes   |
| CRUD utilisateurs          | no     | no   | yes   |
| Modifier son profil        | no     | yes  | yes   |

## 🛣️ 5. Modules & routes

Auth

```
POST   /auth/register
POST   /auth/login
```

Users

```
GET    /users              [Admin]
GET    /users/:id          [Admin | Chef (soi-même)]
PATCH  /users/:id          [Admin | Chef (soi-même)]
DELETE /users/:id          [Admin]
```

Recipes

```
GET    /recipes            [Public]  — avec filtres ?name= &category=
GET    /recipes/:id        [Public]
POST   /recipes            [Chef, Admin]
PATCH  /recipes/:id        [Admin | Chef (propriétaire)]
DELETE /recipes/:id        [Admin | Chef (propriétaire)]
POST   /recipes/:id/image  [Admin | Chef (propriétaire)] — upload + compression
```

Categories

```
GET    /categories         [Public]  — avec filtre ?name=
GET    /categories/:id     [Public]
POST   /categories         [Admin]
PATCH  /categories/:id     [Admin]
DELETE /categories/:id     [Admin]
```

Ingredients

```
GET    /ingredients        [Public]  — avec filtre ?name= (via FatSecret)
GET    /ingredients/:id    [Public]
POST   /ingredients        [Chef, Admin]
PATCH  /ingredients/:id    [Admin | Chef (propriétaire recette)]
DELETE /ingredients/:id    [Admin | Chef (propriétaire recette)]
```

Steps

```
GET    /steps/:id          [Public]
POST   /steps              [Chef, Admin]
PATCH  /steps/:id          [Admin | Chef (propriétaire recette)]
DELETE /steps/:id          [Admin | Chef (propriétaire recette)]
```

## 🖼️ 6. Gestion des images

Upload + compression (Sharp)

1. Réception via @fastify/multipart
2. Traitement avec Sharp :
    - Resize : max 800px de large ou max 600px de haut (fit inside)
    - Format : webp ou jpeg pour optimiser le poids
3. Sauvegarde dans `/uploads/recipes/` avec un nom unique (uuid + extension)
4. Stockage du `imageName` en base

## 🌐 7. Intégration FatSecret API

Flux de recherche d'ingrédient

1. Le client cherche un ingrédient par nom → `GET /ingredients?name=tomate`
2. Le service appelle FatSecret (platform.fatsecret.com) via OAuth 1.0a
3. Les résultats (nom + image) sont retournés et l'idApi est stocké en base lors de la création d'un ingrédient

Points d'attention

- FatSecret utilise OAuth 1.0a → utiliser la lib oauth-1.0a + axios
- Mettre les credentials en variables d'environnement (FATSECRET_KEY, FATSECRET_SECRET)

## ⚙️ 8. Configuration & variables d'environnement

```
env# App
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=secret
DB_NAME=recipes_db

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# FatSecret
FATSECRET_CLIENT_ID=xxx
FATSECRET_CLIENT_SECRET=xxx

# Upload
UPLOAD_DIR=./uploads
```

## 🧱 9. Ordre de développement

```
Étape 1 ─ Initialisation
    Projet NestJS + Fastify, TypeORM, PostgreSQL, .env

Étape 2 ─ Base de données
    Toutes les entités + relations + migrations

Étape 3 ─ Auth module
    Register, Login, JWT Strategy, Guards, Décorateurs

Étape 4 ─ Users module
    CRUD + protection par rôles

Étape 5 ─ Categories module
    CRUD + recherche par nom

Étape 6 ─ Recipes module
    CRUD + recherche + vérification propriétaire

Étape 7 ─ Ingredients module
    CRUD + intégration FatSecret

Étape 8 ─ Steps module
    CRUD lié aux recettes

Étape 9 ─ Upload & compression
    Multipart Fastify + Sharp

Étape 10 ─ Tests & validation globale
    Pipes de validation, gestion des erreurs, DTOs
```

## ✅ 10. Bonnes pratiques à appliquer tout au long

- DTOs avec class-validator sur toutes les entrées
- Global ValidationPipe avec transform: true
- Exception filters personnalisés pour les erreurs métier
- Interceptors pour formatter les réponses
- Ne jamais retourner le mot de passe dans les réponses User (utiliser @Exclude())
- Ownership check dans le service (pas seulement dans le guard) pour les chefs