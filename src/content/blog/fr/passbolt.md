---
title: 'Passbolt : gérer les secrets partagés en équipe sans sacrifier la sécurité'
description: Le partage de mots de passe en équipe est souvent très mal géré. Passbolt apporte une réponse simple, sérieuse, et abordable.
date: 2026-04-03
updatedDate: 2026-04-03
tags:
  - Sécurité
  - Passbolt
  - DevOps
  - Secrets
  - Passwords
slug: passbolt-gestion-secrets-equipe
image: ../img/passbolt.png
lang: fr
---

Dans la quasi-totalité des équipes techniques que j'ai côtoyées, la gestion des secrets partagés est un angle mort. Les mots de passe circulent dans des messages Slack ou Teams, sont stockés dans des pages Confluence, dans des fichiers texte déposés sur un lecteur réseau ou sur un espace SharePoint. Aucun contrôle, aucune gouvernance, aucune traçabilité. Et pourtant, personne ne s'en inquiète vraiment — jusqu'au jour où quelqu'un quitte l'entreprise et que personne ne sait plus quels accès il détenait...

## La règle d'or : privilégier une interconnexion SSO

Avant d'aller plus loin, rappelons la règle fondamentale : le **meilleur secret partagé** entre utilisateurs est celui qui **n'existe pas**.

La bonne pratique est évidemment de configurer toutes les applications pour qu'elles délèguent l'authentification des utilisateurs au fournisseur d'identité de l'entreprise par un protocole standard comme OpenID Connect ou SAML. Cela apporte plusieurs bénéfices immédiats, a minima :

- **Traçabilité** : chaque connexion est liée à une identité nominative, les accès aux applications sont bien tracés de manière centralisée
- **Gestion des habilitations** : les accès suivent les rôles définis dans l'annuaire et les éventuelles politiques de durcissement (MFA, accès conditionnels, politiques de mot de passe, etc.)
- **Onboarding et offboarding simplifiés** : il n'est pas nécessaire de créer de compte dans chacune des applications à l'onboarding d'un utilisateur. Désactiver un compte dans l'annuaire révoque automatiquement tous les accès de l'utilisateur sur l'ensemble des applications.

C'est d'autant plus vrai que la plupart des outils SaaS modernes supportent désormais cette intégration sans friction, même s'il faut regretter que cette configuration nécessite souvent de souscrire à un plan d'abonnement de type Entreprise. Les petites structures aux budgets réduits peuvent donc être pénalisées.

## Les cas résiduels où le partage de secrets reste inévitable

En pratique, l'interconnexion SSO ne couvre pas tout. Il subsiste toujours quelques cas où un secret partagé entre utilisateurs est incontournable :

- **Les comptes de secours locaux** : si le fournisseur d'identité de l'entreprise devient indisponible, ou si la configuration de l'interconnexion entre l'application et l'IDP est défaillante, il faut pouvoir reprendre la main sur le système et se connecter par une voie de secours. Ces comptes d'urgence doivent exister, être documentés, suivis, et être accessibles à plusieurs personnes de confiance dûment habilitées, avec la traçabilité associée.
- **Les outils legacy** qui ne supportent pas le SSO et nécessitent un compte générique, même si la situation est heureusement de moins en moins fréquente.

C'est pour ces situations que [Passbolt](https://www.passbolt.com/) s'impose comme une solution particulièrement adaptée.

## Passbolt : un gestionnaire open-source pensé pour le travail en équipe

Passbolt est un gestionnaire de mots de passe open source, conçu explicitement pour le partage en équipe. Il se distingue des solutions personnelles de gestion de mots de passe ([KeePass](https://keepass.info/), [1Password](https://1password.com), [Dashlane](https://www.dashlane.com/), etc.) par son modèle de gouvernance. L'outil permet de stocker et classer ces différents identifiants et d'y appliquer une gouvernance assez poussée, avec des contrôles d'accès et une traçabilité poussée.

Quelques fonctionnalités qui méritent d'être mises en avant :

- **Partage par groupe** : un secret peut être partagé avec un groupe entier (par exemple, l'équipe SRE), ce qui évite de gérer les accès individuellement à chaque rotation d'équipe.
- **Partage d'OTP** : c'est souvent la grande douleur sur les comptes génériques. Le premier administrateur qui configure l'authentification à deux facteurs charge le QR code sur son téléphone, et personne d'autre n'y a accès. Passbolt permet de stocker et partager le secret TOTP avec le groupe concerné.
- **Intégration SCIM et SSO** : Passbolt supporte la synchronisation automatique des comptes via SCIM avec les principaux fournisseurs d'identité (Okta, Entra ID, etc.), et permet de se connecter à Passbolt lui-même via SSO.
- **Intégration CI/CD** : il est possible d'interroger Passbolt depuis une pipeline pour injecter des secrets dans un processus automatisé, même si je n'ai pas eu l'occasion de le mettre en œuvre personnellement. La solution [Vault](https://www.hashicorp.com/en/products/vault) d'Hashicorp ou son fork open-source [OpenBao](https://openbao.org/) me semblent plus pertinents et fonctionnellement plus riches pour ces cas d'usage.
- **Extensions navigateur** : pour permettre de préremplir automatiquement les identifiants à partir des secrets stockés dans l'outil.

![Interface graphique passbolt](../img/passbolt-screenshot.png)

## Déploiement

L'installation de Passbolt est simple et couvre la plupart des environnements courants. L'outil propose plusieurs méthodes officielles : un installateur dédié pour les distributions Linux (Debian, Ubuntu, RHEL), un `docker-compose` pour une mise en route rapide, et un chart Helm pour les environnements Kubernetes.  
L'architecture reste minimaliste dans tous les cas : un serveur PHP + une base de données MariaDB.

```bash title="Script d'installation docker-compose"
curl -LO  "https://download.passbolt.com/ce/docker/docker-compose-ce.yaml"
curl -LO  "https://github.com/passbolt/passbolt_docker/releases/latest/download/docker-compose-ce-SHA512SUM.txt"
sha512sum -c docker-compose-ce-SHA512SUM.txt && echo "Checksum OK" || (echo "Bad checksum. Aborting" && rm -f docker-compose-ce.yaml)
docker compose -f docker-compose-ce.yaml up -d
```

La version Community Edition couvre largement les besoins d'une petite ou moyenne équipe. Les fonctionnalités avancées (SCIM, SSO, rapports d'audit) nécessitent la version Pro, dont le tarif reste raisonnable.

## Conclusion

Passbolt est à mon sens un des meilleurs amis des CISO et RSSI. Il permet de renforcer l'hygiène numérique d'une entreprise en traitant efficacement la problématique de partage de mots de passe entre utilisateurs.

C'est un outil que je recommande particulièrement aux équipes qui n'ont pas encore de réponse structurée à cette problématique, ou qui utilisent des solutions artisanales comme un coffre-fort KeePass partagé sur un lecteur réseau. Le gain en termes de gouvernance et de tranquillité d'esprit est immédiat.
