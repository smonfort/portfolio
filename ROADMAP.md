# Roadmap

Évolutions identifiées pour le site portfolio.

## Fonctionnalités manquantes (impact fort)

- [x] **Page 404 personnalisée** — sans `src/pages/404.astro`, les visiteurs tombent sur une page générique Vercel
- [x] **RSS Feed** — ajouter `src/pages/rss.xml.ts` pour l'indexation dans les agrégateurs
- [x] **Table des matières** — sommaire ancré en sticky à droite pour les longs articles
- [x] **Navigation entre articles** — liens précédent / suivant dans `BlogLayout`

## SEO & discoverabilité

- [ ] **Pages par tag** — `/blog/tags/[tag].astro` pour rendre les tags cliquables et filtrables
- [x] **Temps de lecture estimé** — calculé au build (mots / 200), affiché sur la card et en haut d'article
- [x] **Meta description différenciée** — chaque page devrait avoir sa propre description (blog index notamment)

## UX & confort de lecture

- [ ] **Bouton "retour en haut"** — bouton `↑` fixe en bas à droite sur les pages longues
- [ ] **Syntaxe colorée** — configurer Shiki (intégré à Astro) pour les blocs de code dans les articles
- [ ] **Pagination** sur `/blog/` quand le nombre d'articles grandira

## Contenu

- [ ] **Section Projets / Réalisations** — case studies concrets (problème → solution → résultats), plus impactant que le seul timeline Experience
- [ ] **Page commerciale freelance** — section dédiée aux missions types, mode de travail, disponibilité (le site est actuellement plus "CV" que "offre freelance")

## Technique mineur

- [x] **Lazy loading** sur les images hero et about
- [ ] **WebP / formats modernes** via le pipeline `astro:assets` sur toutes les images
- [ ] **Composant de partage enrichi** — ajouter Twitter/X et "copier le lien" en plus de LinkedIn
