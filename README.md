# NourOS 🌙💻

> Welcome to NourOS — a tiny operating system built with code, color, caffeine, and controlled chaos.

Portfolio de Nour sous forme de faux système d'exploitation : un bureau, des icônes, des fenêtres.

- 🗂️ **Explorer** — projets
- 🖥️ **Terminal** — who am I?
- 📨 **Mail** — contact
- 📝 **Notes** — blog
- 🎨 **Paint.exe** — côté créatif
- 🎮 **Games** — personnalité
- 🗑️ **Trash** — bugs I survived

🌐 **En ligne** : https://sleepybani.github.io/nouros/

Plan détaillé : [docs/PLAN.md](docs/PLAN.md)

✍️ Écrire un article : [docs/WRITING.md](docs/WRITING.md)

## Stack

Angular 21 (standalone + signals) · SCSS · Vitest · ESLint · Prettier · GitHub Actions

## Lancer le projet

Prérequis : Node `^20.19` ou `^22.12` ou `>=24`.

```bash
npm install
npm start
```

Puis ouvrir http://localhost:4300 (port 4300 pour ne pas entrer en conflit avec une autre app sur 4200).

## Commandes

| Commande               | Ce que ça fait                           |
| ---------------------- | ---------------------------------------- |
| `npm start`            | Serveur de dev avec rechargement auto    |
| `npm test`             | Tests unitaires (Vitest)                 |
| `npm run lint`         | Vérifie le code (ESLint + accessibilité) |
| `npm run format`       | Formate tout le code (Prettier)          |
| `npm run format:check` | Vérifie le formatage sans modifier       |
| `npm run build`        | Build de production dans `dist/`         |
| `npm run build:pages`  | Build pour GitHub Pages (`/nouros/`)     |
| `npm run notes`        | Régénère la liste des articles           |

La CI lance `format:check`, `lint`, `test` et `build` sur chaque PR.

## Déploiement

Chaque push sur `main` déploie sur GitHub Pages (workflow `.github/workflows/deploy.yml`).

À faire **une seule fois** : repo → **Settings → Pages → Source : GitHub Actions**.
