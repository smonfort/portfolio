---
name: brainstorm-article
description: Génère un nouvel article de blog en français à partir d'un fichier de brainstorm dans src/content/blog/brainstorm/. Use when the user says "génère un article", "écris un article", "rédige l'article", "brainstorm-article", or wants to turn raw notes into a blog post.
tools: Read, Write, Edit, Glob, Grep
---

# Brainstorm → Article

Ce skill transforme un fichier de notes brutes en un article de blog complet, dans le style et le format du portfolio.

## Contexte

Les articles du blog se trouvent dans `src/content/blog/fr/`. Le fichier de brainstorm source est dans `src/content/blog/brainstorm/`. Le style des articles est technique mais accessible, à la première personne, sans jargon inutile. La longueur cible est ~600–900 mots (équivalent aux articles existants).

## Processus

### Étape 1 — Identifier le fichier de brainstorm

Si l'utilisateur précise un fichier, l'utiliser directement. Sinon, lister les fichiers disponibles dans `src/content/blog/brainstorm/` et demander lequel traiter.

### Étape 2 — Lire le brainstorm et les articles existants

1. Lire le fichier de brainstorm en entier.
2. Lire **deux articles existants** dans `src/content/blog/fr/` pour calibrer le style, le ton, la longueur et la structure.

### Étape 3 — Analyser et planifier

Avant de rédiger, identifier :

- **Le fil directeur** : quelle est la thèse principale ? Quel problème est posé, quelle solution ou réflexion est apportée ?
- **La structure** : proposer un plan en 3 à 5 sections avec titres H2 (parfois H3), cohérent avec le style des autres articles (intro sans titre, sections thématiques, conclusion).
- **Les illustrations possibles** : pour chaque section, suggérer au moins une façon de l'illustrer :
  - Capture d'écran ou image (`../img/nom-image.png`)
  - Bloc de code avec langage et titre (`\`\`\`lang title="…"\`\`\``)
  - Liste à puces ou tableau comparatif
  - Schéma ou diagramme à décrire

Indiquer ces suggestions clairement avant de rédiger.

### Étape 4 — Rédiger l'article

Produire l'article complet au format Markdown avec frontmatter valide :

```markdown
---
title: '…'
description: '…'
date: YYYY-MM-DD
tags: ['Tag1', 'Tag2']
slug: 'slug-en-kebab-case'
image: '../img/nom-image.png'
lang: fr
---

Introduction sans titre H2…

## Section 1

…

## Section 2

…

## Conclusion

…
```

**Règles de rédaction :**

- Ton : technique mais accessible, direct, première personne (`je`, `nous` si approprié)
- Pas de formules creuses ("dans cet article, nous allons…"), entrer dans le vif du sujet dès l'intro
- Phrases courtes, pas de jargon sans explication
- Les noms d'outils, termes techniques et liens restent tels quels
- Utiliser `**gras**` pour mettre en valeur les concepts clés dans les listes
- Les blocs de code incluent le langage et un `title=""` si pertinent
- Les images sont référencées comme `../img/nom-image.png` (images partagées dans `src/content/blog/img/`)
- Date : utiliser la date du jour

### Étape 5 — Écrire le fichier

Écrire l'article dans `src/content/blog/fr/<slug>.md`.

Ne **pas** créer la version anglaise — c'est le rôle du skill `sync-translations`.

### Étape 6 — Rapport final

Indiquer :

- Le fichier créé et son slug
- Le plan retenu
- Les illustrations suggérées (à créer manuellement ou via un outil d'IA)
- La prochaine étape recommandée : `sync-translations` pour la version anglaise

## Calibrage du style

Exemples de formulations typiques à reproduire :

- Intro directe qui pose un constat ou une tension
- Sections thématiques bien délimitées, pas de sous-sections abusives
- Listes à puces pour les énumérations de plus de 3 éléments
- Conclusion courte qui récapitule les publics cibles ou l'essentiel
- Liens externes intégrés naturellement dans le texte (`[texte](url)`)
