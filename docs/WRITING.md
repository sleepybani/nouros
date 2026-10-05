# ✍️ Écrire un article sur NourOS

Un article = **un seul fichier** Markdown dans `public/notes/`. C'est tout.

---

## 🚀 Le plus rapide (depuis n'importe où, même le téléphone)

1. Ouvre le **Terminal** de NourOS et tape `write`
   (ou va directement sur https://github.com/sleepybani/nouros/new/main/public/notes)
2. GitHub ouvre un éditeur avec un **modèle** déjà rempli
3. Change le **nom du fichier** → il devient l'URL (`mon-article.md` → `/notes/mon-article`)
4. Remplis l'en-tête, écris ton texte
5. **Commit** → déploiement automatique → l'article est en ligne ✨

---

## 🧾 L'en-tête (obligatoire)

```md
---
title: Mon super article
date: 2026-10-05
category: women in tech
summary: Une phrase qui donne envie de lire.
---

Ton texte commence ici…
```

| Champ         | Obligatoire | Valeurs                                                                       |
| ------------- | ----------- | ----------------------------------------------------------------------------- |
| `title`       | ✅          | le titre affiché                                                              |
| `date`        | ✅          | format `AAAA-MM-JJ`                                                           |
| `category`    | ✅          | `dev` · `art` · `learning` · `women in tech` · `life`                         |
| `summary`     | ✅          | 1 phrase                                                                      |
| `externalUrl` | ❌          | article publié ailleurs (ex : sfeir.dev) → NourOS affiche le résumé + un lien |
| `language`    | ❌          | `fr` si l'article n'est pas en anglais → affiche « in French »                |

❌ Un champ oublié ou une catégorie inconnue → le build s'arrête avec un **message clair** (fichier + champ).

---

## ✏️ Mémo Markdown

| Tu écris             | Ça donne      |
| -------------------- | ------------- |
| `## Titre`           | un sous-titre |
| `**gras**`           | **gras**      |
| `_italique_`         | _italique_    |
| `- point`            | une liste     |
| `` `code` ``         | `code`        |
| `> citation`         | une citation  |
| `[texte](https://…)` | un lien       |

---

## 🔗 Partager

Chaque article a des boutons :

- **🔗 Copy link** → copie le lien
- **Share on LinkedIn ↗**
- **📤 Share…** sur téléphone (menu de partage du téléphone)

Pour un article externe, c'est le **lien d'origine** qui est partagé (meilleur aperçu).

---

## 🧑‍💻 En local

```bash
npm start
```

Ajouter un fichier pendant que `npm start` tourne → relancer `npm start` (ou `npm run notes`) pour qu'il apparaisse dans la liste.
