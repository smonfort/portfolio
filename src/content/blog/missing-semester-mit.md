---
title: "Le Missing Semester du MIT : les outils que l'université ne t'apprend pas"
description: 'Le MIT propose gratuitement un cours sur les outils du quotidien du développeur. Un condensé de bonnes pratiques trop souvent ignorées dans les cursus traditionnels.'
date: 2026-03-19
slug: 'missing-semester-computer-science-mit'
tags: ['Outils', 'Terminal', 'Git', 'Productivité', 'Formation']
image: './img/missing-semester-mit.png'
---

Les cursus en informatique forment des ingénieurs capables de concevoir des algorithmes complexes, de modéliser des architectures distribuées ou de raisonner sur la théorie des langages. Mais ils passent systématiquement à côté d'un sujet pourtant fondamental : la maîtrise des outils du quotidien.

C'est exactement le constat qu'ont fait des enseignants du MIT, à l'origine du [Missing Semester of Your CS Education](https://missing.csail.mit.edu/). Un cours gratuit, disponible en ligne, qui comble ce manque avec une efficacité redoutable. Après des éditions 2019 et 2020 que j'avais suivies avec intérêt, une édition 2026 vient tout juste d'être mise en ligne. Son contenu est actualisé pour refléter l'évolution des pratiques et des outils, marquée par la progression forte de l'IA.

## Un déficit de formation sur des sujets clés

Un étudiant en informatique passe des centaines d'heures à utiliser un terminal, un éditeur de texte, ou un système de contrôle de version. Pourtant, dans la quasi-totalité des cursus, personne ne lui enseigne vraiment ces outils. Il bricole, il copie des commandes depuis Stack Overflow ou ChatGPT, il accumule de mauvaises habitudes sans jamais comprendre ce qu'il fait.

Le résultat : des ingénieurs diplômés qui ne savent pas écrire un script shell propre, qui font des `git add .` sans réfléchir ou qui se retrouvent tétanisés à l'idée de rebaser une branche. Je l'ai constaté personnellement : un nombre assez important de développeurs ignorent totalement le mode de fonctionnement interne de Git, et ne savent pas réellement ce que recouvrent des concepts aussi simples qu'un commit, une branche, ou un tag.

## Le programme de formation

Le programme 2026 s'articule autour de neuf séances (vidéos disponibles sur [cette playlist YouTube](https://www.youtube.com/playlist?list=PLyzOVJj3bHQunmnnTXrNbZnBaCA-ieK4L)) :

- **[Le shell et la ligne de commande](https://missing.csail.mit.edu/2026/course-shell/)** : navigation, redirection, pipes, scripting Bash. Les fondations sur lesquelles tout le reste repose.
- **[L'environnement de ligne de commande](https://missing.csail.mit.edu/2026/command-line-environment/)** : configuration d'un environnement cohérent, gestion des dotfiles, personnalisation du terminal.
- **[Environnement de développement et outils](https://missing.csail.mit.edu/2026/development-environment/)** : éditeurs, LSP, snippets — tirer le meilleur parti de son environnement de développement.
- **[Débogage et profiling](https://missing.csail.mit.edu/2026/debugging-profiling/)** : utiliser les bons outils pour identifier et corriger les problèmes, plutôt que d'ajouter des `print` à l'aveugle.
- **[Contrôle de version avec Git](https://missing.csail.mit.edu/2026/version-control/)** : au-delà du simple `commit/push`, comprendre le modèle de données de Git pour l'utiliser avec confiance. À suivre absolument pour ceux qui hésitent encore.
- **[Packaging et distribution](https://missing.csail.mit.edu/2026/shipping-code/)** : comment conditionner et livrer du code de manière reproductible.
- **[Agentic coding](https://missing.csail.mit.edu/2026/agentic-coding/)** : l'intégration des outils d'IA dans le workflow de développement, traité comme une compétence à part entière plutôt qu'un gadget.
- **[Beyond the Code](https://missing.csail.mit.edu/2026/beyond-code/)** : sécurité, vie privée, et bonnes pratiques au-delà du code lui-même.
- **[Qualité du code](https://missing.csail.mit.edu/2026/code-quality/)** : linters, formatters, revue de code — les pratiques qui font la différence entre un projet maintenable et un projet qu'on redoute d'ouvrir.

## Ce qui me plaît dans cette approche

Le cours ne cherche pas à être exhaustif. Il cherche à créer un déclic : montrer qu'il existe une façon plus efficace, plus maîtrisée, de travailler avec ses outils. Une fois ce déclic enclenché, chacun peut approfondir à son rythme.

J'apprécie aussi que l'édition 2026 intègre nativement l'_agentic coding_, en illustrant avec Claude Code sur quelques cas basiques. Le sujet est traité comme une compétence à part entière, au même titre que Git ou le shell.

Enfin, l'utilisation assez intensive du terminal correspond parfaitement à mes préférences personnelles !

## Pour qui ?

Ce cours est utile à plusieurs profils :

- Les **étudiants ou jeunes ingénieurs** qui n'ont jamais vraiment pris le temps de comprendre leurs outils.
- Les **développeurs expérimentés** qui ont accumulé des habitudes sans jamais les questionner.
- Les **CTO et tech leads** qui souhaitent partager une base commune solide avec leurs équipes.
- Tous ceux qui veulent pouvoir faire un rebase interactif en comprenant _vraiment_ ce qu'ils font !

Le contenu est en anglais, mais parfaitement accessible. Chaque séance est accompagnée de notes de cours détaillées et d'exercices pratiques que je recommande chaudement.
