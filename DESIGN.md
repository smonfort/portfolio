# DESIGN.md

Design reference for the portfolio site. Any new page, section, or component must conform to these principles.

---

## 1. Thème général

Site entièrement en **dark mode** (pas de toggle clair/sombre). Fond de base `#0a0a0a` (quasi-noir). L'accent principal est l'indigo (`#6366f1` / `indigo-500`).

---

## 2. Couleurs

### Palette de base

| Rôle                | Valeur                   | Classe Tailwind                    |
| ------------------- | ------------------------ | ---------------------------------- |
| Fond de page        | `#0a0a0a`                | — (défini en CSS global)           |
| Fond de carte       | `rgba(255,255,255,0.03)` | `bg-white/[0.03]`                  |
| Bordure subtile     | `rgba(255,255,255,0.05)` | `border-white/5`                   |
| Bordure hover       | `rgba(99,102,241,0.2)`   | `border-indigo-500/20`             |
| Accent principal    | `#6366f1`                | `bg-indigo-600`, `text-indigo-500` |
| Accent hover        | `#818cf8`                | `text-indigo-400`                  |
| Texte titre         | `#ffffff` / `#f9fafb`    | `text-white` / `text-gray-50`      |
| Texte corps         | `#e5e5e5`                | `text-neutral-200`                 |
| Texte secondaire    | `#a3a3a3`                | `text-neutral-400`                 |
| Texte métadonnée    | `#9ca3af`                | `text-gray-400`                    |
| Succès / disponible | `#4ade80`                | `text-green-400`                   |

### Règles d'utilisation

- Les **bordures** sont toujours `border-white/5` au repos, `border-indigo-500/20` ou `border-indigo-500/30` au survol.
- Les **fonds de carte** sont `bg-white/[0.03]` ou transparent — jamais de couleur opaque forte.
- L'**accent indigo** est réservé aux actions primaires, aux tags, aux labels de section, aux états de survol.
- Le **dégradé de texte** (indigo → rouge-rose) est utilisé uniquement pour les éléments phares (titre hero, mot-clé fort) via la classe utilitaire `text-gradient`.

---

## 3. Typographie

**Police unique : Inter** (Google Fonts, poids 300–800).

### Hiérarchie

| Niveau            | Taille                                     | Poids   | Couleur            |
| ----------------- | ------------------------------------------ | ------- | ------------------ |
| H1 (hero)         | `text-4xl` → `sm:text-5xl` → `md:text-6xl` | 700     | `text-white`       |
| H2 (section)      | `text-3xl` → `text-4xl`                    | 700     | `text-white`       |
| H3 (sous-section) | `text-2xl`                                 | 700     | `text-white`       |
| Label de section  | `text-sm uppercase tracking-widest`        | 600     | `text-indigo-400`  |
| Corps             | `text-base` / `text-lg`                    | 400–500 | `text-neutral-200` |
| Métadonnée        | `text-sm`                                  | 400     | `text-gray-400`    |
| Badge / tag       | `text-xs`                                  | 500–600 | `text-indigo-400`  |

### Règles

- Letter-spacing négatif (`-tracking-tight` ou `-0.025em`) sur les titres.
- Les labels de section (ex. « EXPÉRIENCE », « COMPÉTENCES ») sont toujours en **majuscules, petite taille, indigo-400**.
- Le corps des articles utilise `leading-[1.75]` pour une bonne lisibilité.

---

## 4. Espacement

| Usage                          | Valeur                                  |
| ------------------------------ | --------------------------------------- |
| Padding vertical d'une section | `py-24` (96 px)                         |
| Padding horizontal global      | `px-6` (24 px)                          |
| Max-width des sections         | `max-w-3xl` à `max-w-5xl` selon densité |
| Gap entre cartes               | `gap-6` ou `gap-8`                      |
| Padding interne d'une carte    | `p-5` ou `p-6`                          |
| Gap entre éléments inline      | `gap-2` à `gap-4`                       |

---

## 5. Composants récurrents

### Bouton primaire

```
bg-indigo-600 hover:bg-indigo-500 text-white
rounded-xl px-8 py-3.5 text-sm font-medium
inline-flex items-center gap-3 transition-colors
```

### Bouton secondaire / ghost

```
border border-white/10 bg-white/5 hover:bg-white/10 text-white
rounded-xl px-8 py-3.5 text-sm font-medium
inline-flex items-center gap-3 transition-colors
```

### Carte

```
rounded-xl border border-white/5 bg-white/[0.03]
hover:border-indigo-500/20 hover:bg-indigo-500/[0.03]
transition-colors p-5 (ou p-6)
```

### Tag / badge

```
rounded-full bg-indigo-500/10 text-indigo-400
text-xs font-medium px-3 py-1
```

### Icône + texte (bouton, lien)

Toujours `inline-flex items-center gap-{2|3}`. L'icône est un SVG `h-4 w-4` (ou `h-3.5 w-3.5` pour les petits badges).

---

## 6. Layout & grille

- **Navigation** : fixe, `h-16`, `bg-black/60 backdrop-blur-xl border-b border-white/5`.
- **Sections** : centrées avec `mx-auto max-w-{3xl|4xl|5xl} px-6`.
- **Grilles** :
  - 2 colonnes : `grid md:grid-cols-2 gap-{6|8|16}`
  - 4 colonnes : `grid md:grid-cols-4 gap-6`
  - Liste blog : colonne unique sur mobile, flex-row avec miniature sur desktop.
- **Footer** : `border-t border-white/5 py-10`.

---

## 7. Effets de survol (pattern universel)

Appliquer systématiquement sur les cartes et liens interactifs :

| Propriété  | Repos               | Survol                 |
| ---------- | ------------------- | ---------------------- |
| Bordure    | `border-white/5`    | `border-indigo-500/20` |
| Fond       | `bg-white/[0.03]`   | `bg-indigo-500/[0.03]` |
| Texte lien | `text-gray-400`     | `text-indigo-400`      |
| Transition | `transition-colors` | —                      |

Les micro-animations sur les icônes sont acceptées : `group-hover:-translate-x-1`, `group-hover:translate-x-0.5`, `group-hover:scale-125`.

---

## 8. Animations

- Toutes les transitions de couleur : `transition-colors duration-300`.
- `animate-ping` : réservé aux indicateurs de statut (badge « Disponible »).
- Scroll fluide : `scroll-behavior: smooth` (désactivé via `prefers-reduced-motion`).
- Barre de progression : gradient `from-indigo-500 to-violet-500`.
- **Respecter `prefers-reduced-motion`** sur toutes les animations non essentielles.

---

## 9. Responsive

Mobile-first. Breakpoints utilisés :

| Breakpoint | Largeur  | Usage principal                     |
| ---------- | -------- | ----------------------------------- |
| _(base)_   | < 640 px | Mobile, colonne unique              |
| `sm:`      | 640 px   | Typographie agrandie                |
| `md:`      | 768 px   | Grilles multi-colonnes, nav desktop |
| `xl:`      | 1280 px  | Layout blog complet                 |

---

## 10. Accessibilité

- Hiérarchie de titres stricte : `h1` → `h2` → `h3`, jamais sautée.
- Tous les boutons iconiques ont un `aria-label`.
- États focus visibles : `outline-2 solid #818cf8 outline-offset-2px`.
- Textes de remplacement sur toutes les images (`alt`).
- Éléments décoratifs : `aria-hidden="true"`.
- Lien « aller au contenu » en haut de page (skip link).
- HTML sémantique : `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.

---

## 11. Ce qu'il ne faut pas faire

- Ne pas introduire de **mode clair** ou de toggle de thème.
- Ne pas utiliser de couleurs opaques fortes pour les fonds de carte (garder la transparence).
- Ne pas utiliser d'autres polices qu'Inter.
- Ne pas créer de boutons sans état de survol visible.
- Ne pas omettre `transition-colors` sur les éléments interactifs.
- Ne pas dépasser `max-w-5xl` pour le contenu principal.
- Ne pas utiliser des bordures visibles (couleur pleine) au repos — toujours `white/5`.
