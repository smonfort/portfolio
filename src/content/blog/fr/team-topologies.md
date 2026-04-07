---
title: 'Team topologies : concevoir son organisation comme on conçoit une architecture'
description: Team topologies propose un cadre simple et opérationnel pour organiser les équipes logicielles en tenant compte de la loi de Conway.
date: 2026-04-07
updatedDate: 2026-04-07
tags:
  - Architecture
  - Organisation
  - DevOps
  - Management
  - Lecture
slug: team-topologies
image: ../img/team-topologies.png
lang: fr
---

En 1968, [Mel Conway](https://en.wikipedia.org/wiki/Melvin_Conway) publie une observation qui résonne encore aujourd'hui : _"Les organisations qui conçoivent des systèmes sont contraintes de produire des designs qui sont des copies de leurs structures de communication."_ Autrement dit, si votre organisation est découpée en équipes frontend, backend et base de données, votre architecture le sera aussi, qu'on le veuille ou non.

## La loi de Conway est inévitable

[Team Topologies](https://teamtopologies.com/), écrit par Matthew Skelton et Manuel Pais, part de ce constat pour proposer une nouvelle méthode d'organisation d'équipes. Plutôt que de subir la loi de Conway, le livre propose de la considérer comme un incontournable et d'organiser délibérément les équipes en conséquence, afin d'obtenir l'organisation la plus adaptée aux enjeux business.

C'est un changement de perspective important, qui invite à traiter l'organisation elle-même comme une entité à concevoir. Initialement lancée par les auteurs sur des sujets DevOps uniquement au début des années 2010, l'approche s'est progressivement élargie au design d'équipes plus globales, sur toute la chaîne de valeur.

## Quatre topologies d'équipe, pas plus !

Team topologies propose un cadre pour clarifier les responsabilités entre les différentes équipes d'une organisation tout en veillant à réduire au maximum leur charge mentale. La méthode rappelle l'importance de dessiner des équipes relativement petites (de 7 à 9 personnes idéalement), disposant de toutes les compétences nécessaires pour mener leur mission, avec un turnover réduit au maximum.

Pour rendre l'organisation explicite, le cœur du livre décrit quatre (et uniquement quatre) types d'équipes fondamentaux :

- **Stream-aligned** : le type d'équipe principale, alignée sur un flux de valeur continu (un produit, un parcours utilisateur, un domaine métier). Elle est autonome de bout en bout, de la captation du besoin jusqu'au suivi en production, sans avoir "à passer la main" à une équipe tierce pour délivrer de la valeur aux utilisateurs finaux. Les trois autres types d'équipe existent pour réduire la charge qui pèse sur ces équipes _stream-aligned_.

- **Enabling** : des experts transverses qui aident les équipes _stream-aligned_ à monter en compétence sur un sujet donné (sécurité, observabilité, architecture...). Leur mission se doit d'être temporaire par nature : une _enabling team_ efficace rend les équipes qu'elle accompagne autonomes. Ces équipes sont aussi attendues sur le fait d'explorer de nouveaux territoires en avance de phase, dans l'intérêt des _stream-aligned_ teams.

- **Complicated-subsystem** : une équipe de spécialistes responsable d'un composant qui nécessite une expertise pointue (moteur de calcul, traitement vidéo, algorithme de recommandation...) qui dépasserait la charge cognitive d'une équipe généraliste.

- **Platform** : elle fournit un ensemble de services internes en _self-service_ aux équipes _stream-aligned_, sous forme d'une offre produit cohérente. L'objectif est qu'une équipe _stream-aligned_ puisse déployer, superviser et opérer son service en autonomie sans dépendre en permanence d'une équipe infra.

## Trois modes d'interaction

Identifier les types d'équipes ne suffit pas. Il faut aussi préciser comment elles interagissent, et quand faire évoluer ces interactions. Team topologies met en avant trois modes d'interaction :

- **Collaboration** : deux équipes travaillent étroitement ensemble sur une période définie, pour explorer un domaine incertain ou valider une approche.

- **X-as-a-Service** : une équipe consomme ce qu'une autre produit, avec un minimum de coordination. Les responsabilités sont claires, les interfaces bien définies.

- **Facilitation** : une équipe aide une autre à développer une compétence ou à surmonter un obstacle, avec l'objectif explicite de la rendre autonome. C'est le mode naturel d'interaction des _enabling teams_.

Ces modes ne sont pas figés et l'organisation doit pouvoir les faire évoluer dans le temps. Par exemple, deux équipes peuvent commencer en mode collaboration pour explorer ensemble un sujet complexe, en co-responsabilité, puis basculer en mode _X-as-a-Service_ une fois les contours clairement identifiés et définis entre les deux équipes.

## Ressources complémentaires

En complément du livre, les auteurs proposent un formalisme graphique standard pour représenter les types d'équipe d'une organisation et leurs interactions. Un [repository Github](https://github.com/TeamTopologies/Team-Shape-Templates) officiel propose des templates de documents pour différents outils (PowerPoint, Excalidraw, Diagram.net, Figma, etc.), afin de pouvoir modéliser son organisation selon ce formalisme.

![Illustration team topologies](../img/team-topo-illu.png)

## Conclusion

Team Topologies est un livre court, dense, et immédiatement applicable. Il ne propose pas de modèle universel à copier-coller mais offre un vocabulaire commun pour dessiner l'organisation la plus adaptée à son contexte.

Je trouve l'approche très pragmatique et bien plus simple qu'un cadre très (trop?) structuré comme SAFe. En plus de la classification des différents types d'équipes, j'apprécie particulièrement le fait de rendre explicite les modes de collaboration entre équipes, ce qui permet de rendre l'organisation lisible de tous et beaucoup plus efficace.
