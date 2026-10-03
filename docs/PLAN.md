# NourOS — Plan du portfolio

> Welcome to NourOS — a tiny operating system built with code, color, caffeine, and controlled chaos.

Portfolio sous forme de faux système d'exploitation. On arrive sur un bureau, chaque icône ouvre une fenêtre.

---

## 1. Objectifs

| Objectif                                            | Mesure de réussite                                       |
| --------------------------------------------------- | -------------------------------------------------------- |
| Montrer le profil dev (full-stack JS, Angular/Nest) | Un recruteur trouve projets + stack en < 30 s            |
| Montrer le côté créatif / humain                    | Paint, Notes, Games accessibles mais pas envahissants    |
| Rester pro malgré le concept                        | Bouton **Quick CV** toujours visible, PDF téléchargeable |
| Mobile propre                                       | Version cards dédiée, pas un desktop écrasé              |
| Rapide et accessible                                | Lighthouse ≥ 90 (perf, a11y, SEO), navigation clavier    |

**Règle d'or :** pas d'animations avant que tout le contenu soit en place.

---

## 2. Stack technique

| Couche      | Choix                                                               | Pourquoi                           |
| ----------- | ------------------------------------------------------------------- | ---------------------------------- |
| Framework   | Angular (dernière stable), standalone components, signals           | Colle au profil                    |
| Style       | SCSS + CSS custom properties (design tokens)                        | Thème dark/pastel simple à ajuster |
| Contenu     | Fichiers TS/JSON dans `src/app/data/` (projets, bugs, skills)       | Pas de backend nécessaire          |
| Articles    | Markdown dans `src/content/notes/*.md` (+ `ngx-markdown` plus tard) | Écrire facilement                  |
| Contact     | Formspree (ou `mailto:` en v1)                                      | Pas de serveur                     |
| Déploiement | GitHub Pages via GitHub Actions                                     | Gratuit, lié à la repo             |
| Qualité     | ESLint, Prettier, tests unitaires sur le `WindowManagerService`     | La logique fenêtres est le cœur    |

---

## 3. Les 7 apps (icônes)

Le texte dit « 6 icônes max ». Proposition : **6 icônes sur le bureau** + la **Corbeille** en bas à droite (comme un vrai OS), donc elle ne charge pas visuellement.

| Icône | App                           | Contenu                                                                                                                               | Priorité |
| ----- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 🗂️    | **Explorer** — Projects       | EV-ON, Atelier des Jasmins, Evento, KC Media, chatbot ATI. Chaque projet : contexte, stack, problème, solution, screenshots, liens    | P0       |
| 🖥️    | **Terminal** — Who am I?      | `whoami`, `skills`, `projects`, `contact`, `funfacts`, `help`, `clear`                                                                | P0       |
| 📨    | **Mail** — Contact            | Faux client mail, formulaire « Send message to Nour » + liens LinkedIn/GitHub                                                         | P0       |
| 📝    | **Notes** — Blog              | Liste d'articles (dev, art, apprentissage, femmes en tech, expériences)                                                               | P1       |
| 🎨    | **Paint.exe** — Creative side | Galerie peintures + réflexions artistiques                                                                                            | P1       |
| 🎮    | **Games** — Personality       | League, gaming, danse, art, hobbies (court)                                                                                           | P2       |
| 🗑️    | **Trash** — Bugs I survived   | « GCP access denied », « npm blocked by corporate network », « Angular component from hell »… format : symptôme → cause → fix → leçon | P1       |

Toujours visible (hors icônes) : **Quick CV** (bouton dans la taskbar ou en haut à droite → fenêtre CV + téléchargement PDF).

---

## 4. Expérience utilisateur

### Desktop (≥ 1024 px)

1. **Boot** court (≤ 2 s, skippable au clic / touche, sauté si déjà vu via `sessionStorage`) : « Starting NourOS… »
2. **Bureau** : fond dark dreamy, icônes en grille à gauche, widget « Today's reminder » à droite.
3. **Fenêtres** : ouvrir, fermer, minimiser, focus (z-index), drag (P1), resize (P2).
4. **Taskbar** en bas :
   - bouton menu NourOS + apps ouvertes
   - `Focus mode ON` · `Currently building: better interfaces` · `Mood: creative but debugging` · `Location: Strasbourg / Reichstett`
   - horloge
   - **Quick CV**

### Tablette (768–1023 px)

Bureau conservé, mais fenêtres en plein écran (pas de drag).

### Mobile (< 768 px)

Pas de faux desktop. Écran d'accueil type « launcher » :

- header NourOS + phrase d'accroche
- grille de **cards** (une par app) → ouvre une page plein écran avec bouton retour
- Quick CV en bouton fixe
- statuts taskbar affichés en petit bloc sous le header

### Accessibilité

- Icônes = `<button>` avec label, navigables au clavier (Tab / Entrée / flèches)
- Fenêtre = `role="dialog"`, focus piégé, `Échap` ferme
- `prefers-reduced-motion` respecté (boot + animations désactivés)
- Contraste pastel sur dark vérifié (AA minimum)

### Routing / deep links

Chaque fenêtre a une URL : `/projects`, `/projects/ev-on`, `/terminal`, `/notes/:slug`… Sur desktop, la route ouvre la fenêtre sur le bureau ; sur mobile, elle affiche la page. Partager un lien vers un projet doit marcher.

---

## 5. Architecture Angular

```
src/app/
├── core/
│   ├── window-manager.service.ts   # état des fenêtres (signals) : open/close/minimize/focus/position
│   ├── boot.service.ts             # boot déjà vu ?
│   ├── breakpoint.service.ts       # desktop / tablet / mobile
│   └── app-registry.ts             # liste des apps : id, titre, icône, composant, route, taille par défaut
├── shell/
│   ├── boot-screen/                # BootScreenComponent
│   ├── desktop/                    # DesktopComponent (bureau + icônes + fenêtres ouvertes)
│   ├── desktop-icon/               # IconComponent
│   ├── window/                     # WindowComponent (cadre générique : barre titre, boutons, contenu projeté)
│   ├── taskbar/                    # TaskbarComponent
│   ├── reminder-widget/            # widget « Today's reminder »
│   └── mobile-launcher/            # version cards mobile
├── apps/
│   ├── explorer/                   # ExplorerComponent + ProjectDetailComponent + ProjectCardComponent
│   ├── terminal/                   # TerminalComponent + commands.ts (parseur de commandes)
│   ├── mail/                       # MailComponent
│   ├── notes/                      # NotesComponent + NoteDetailComponent
│   ├── paint/                      # PaintComponent (galerie)
│   ├── games/                      # GamesComponent
│   ├── trash/                      # TrashComponent (bugs survived)
│   └── cv/                         # QuickCvComponent
├── data/
│   ├── projects.ts
│   ├── bugs.ts
│   ├── skills.ts
│   ├── artworks.ts
│   ├── hobbies.ts
│   ├── reminders.ts
│   └── profile.ts                  # nom, liens, statuts taskbar, phrase d'accroche
└── styles/
    ├── _tokens.scss                # couleurs, radius, ombres, typo
    └── _window.scss
```

### Modèle de données (exemples)

```ts
interface OsApp {
  id: 'explorer' | 'terminal' | 'mail' | 'notes' | 'paint' | 'games' | 'trash' | 'cv';
  title: string;
  icon: string; // chemin SVG
  route: string;
  component: () => Promise<Type<unknown>>; // lazy load
  defaultSize: { w: number; h: number };
}

interface WindowState {
  appId: OsApp['id'];
  params?: Record<string, string>; // ex. { slug: 'ev-on' }
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
}

interface Project {
  slug: string;
  name: string;
  tagline: string;
  context: string;
  problem: string;
  solution: string;
  stack: string[];
  role: string;
  year: number;
  screenshots: string[];
  links?: { live?: string; repo?: string };
}

interface SurvivedBug {
  title: string; // "npm blocked by corporate network"
  symptom: string;
  cause: string;
  fix: string;
  lesson: string;
  tags: string[];
}
```

Le `WindowManagerService` est la seule source de vérité : le bureau, la taskbar et le router lisent ses signals.

---

## 6. Direction visuelle

Vibe : **dark desktop + icônes pastel + dreamy + tech girl + chaos créatif maîtrisé.** Pas un Windows copié.

Tokens de départ (à ajuster sur Figma) :

| Token         | Valeur                          | Usage               |
| ------------- | ------------------------------- | ------------------- |
| `--bg`        | `#14121f`                       | fond bureau         |
| `--bg-glow`   | dégradé radial violet/bleu nuit | ambiance « dreamy » |
| `--surface`   | `#1f1c2e`                       | fenêtres            |
| `--surface-2` | `#2a2640`                       | barre de titre      |
| `--text`      | `#ece8f6`                       | texte               |
| `--muted`     | `#a39cbd`                       | texte secondaire    |
| `--pink`      | `#f5b8d0`                       | accent              |
| `--lavender`  | `#c7b8f5`                       | accent              |
| `--mint`      | `#b8f0dc`                       | succès / terminal   |
| `--peach`     | `#f8d1b0`                       | warning             |
| `--sky`       | `#b8dcf5`                       | liens               |

- Typo : une sans-serif douce (ex. Inter / Nunito) + une mono pour le terminal (JetBrains Mono)
- Fenêtres arrondies (12 px), ombre douce, barre de titre avec 3 pastilles pastel
- Icônes : SVG maison simples, style pastel cohérent (pas d'emoji en prod)

---

## 7. Feuille de route

### Phase 0 — Préparation (½ journée)

- [ ] Créer la repo GitHub `nouros`
- [ ] Maquette papier/Figma : bureau desktop + 1 fenêtre + écran mobile
- [ ] Valider les 6 icônes + Corbeille
- [ ] Rassembler le contenu brut : textes projets, screenshots, CV PDF, 3–5 bugs, 3–6 peintures

### Phase 1 — Squelette (1–2 jours)

- [ ] `ng new` (standalone, SCSS, routing), ESLint + Prettier
- [ ] Design tokens + fond du bureau
- [ ] `app-registry` + `WindowManagerService` (open/close/focus/minimize) + tests
- [ ] `DesktopComponent`, `IconComponent`, `WindowComponent` (statique, positionné en cascade)
- [ ] `TaskbarComponent` avec statuts + horloge + Quick CV

### Phase 2 — Contenu P0 (2–3 jours)

- [ ] Explorer : liste projets + détail projet (5 projets)
- [ ] Terminal : saisie, historique (↑/↓), commandes `help whoami skills projects contact funfacts clear`
- [ ] Mail : formulaire + liens
- [ ] Quick CV : fenêtre + PDF

### Phase 3 — Mobile (1–2 jours)

- [ ] `BreakpointService` + `MobileLauncherComponent` (cards)
- [ ] Routes partagées desktop/mobile (deep links)
- [ ] Test sur vrai téléphone

> Mobile avant P1 volontairement : un recruteur ouvre souvent le lien sur téléphone.

### Phase 4 — Contenu P1/P2 (2–3 jours)

- [ ] Trash (bugs survived)
- [ ] Notes (articles Markdown)
- [ ] Paint.exe (galerie)
- [ ] Games (hobbies)
- [ ] Widget « Today's reminder » (rotation aléatoire)

### Phase 5 — Mise en ligne (½ journée)

- [ ] GitHub Actions → GitHub Pages (`base-href` correct, fallback `404.html` pour les routes)
- [ ] Meta SEO + Open Graph image
- [ ] Lighthouse + test clavier + test lecteur d'écran rapide

### Phase 6 — Polish (seulement maintenant)

- [ ] Boot animation
- [ ] Drag des fenêtres, puis resize
- [ ] Transitions ouverture/fermeture
- [ ] Easter eggs terminal (`sudo`, `coffee`, `sleep`…)
- [ ] Bascule FR/EN

---

## 8. Hors scope v1

- Backend / CMS
- Resize de fenêtres multi-écrans complexe, snap, bureau multiple
- Éditeur Paint fonctionnel (c'est une galerie, pas un vrai Paint)
- Comptes / commentaires sur le blog

---

## 9. Questions ouvertes

1. Nom final : **NourOS** ? (alternatives : SleepyBani OS, Nour.exe, Nour Studio OS)
2. Langue : FR, EN ou les deux dès la v1 ?
3. Repo publique ou privée ? (publique recommandé : c'est un portfolio)
4. Domaine perso ou `sleepybani.github.io/nouros` ?
5. Quels projets peuvent montrer des screenshots (clients / confidentialité : KC Media, EV-ON, ATI) ?
