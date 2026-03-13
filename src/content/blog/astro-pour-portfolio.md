---
title: "Landing zone AWS : pourquoi c'est la première chose à faire"
description: "Avant de déployer quoi que ce soit sur AWS, construire une landing zone solide est un investissement qui paie sur toute la durée de vie de votre cloud. Retour d'expérience."
date: 2026-02-20
tags: ["AWS", "Cloud", "Architecture"]
---

Chez CACD2, nous avons accompagné des dizaines d'entités du Groupe Crédit Agricole dans leur migration vers AWS. Le premier chantier — avant même de parler de workloads applicatifs — a toujours été la landing zone. Voici pourquoi, et comment l'aborder.

## Qu'est-ce qu'une landing zone ?

Une landing zone est l'ensemble des fondations cloud que vous construisez *avant* d'y déployer vos applications. Elle couvre :

- L'organisation des comptes AWS (AWS Organizations)
- Les politiques de sécurité et de gouvernance (SCPs)
- Le réseau de base (VPCs, Transit Gateway, DNS)
- Le logging centralisé et l'observabilité
- L'Identity & Access Management (SSO, rôles cross-accounts)
- Le FinOps (tagging, alertes de coûts, budgets)

## Pourquoi ne pas "juste commencer" sur AWS ?

C'est la tentation : un compte AWS, une carte bleue, et on déploie. C'est exactement comme ça qu'on se retrouve deux ans plus tard avec :

- Des ressources orphelines non taguées que personne ne comprend
- Des accès IAM en `AdministratorAccess` partout "en attendant"
- Des coûts cloud qui explosent sans visibilité sur les responsables
- Des équipes qui ne peuvent pas collaborer faute d'une structure de comptes claire

Le coût de refactorer tout ça *a posteriori* est sans commune mesure avec celui de le faire dès le départ.

## Les composants non-négociables

### 1. Multi-account strategy

Chaque workload dans son propre compte. Un compte par environnement (dev, staging, prod). Un compte de sécurité. Un compte de log archive. AWS Control Tower automatise tout ça.

### 2. Infrastructure as Code from day one

Terraform ou Pulumi. Tout ce qui n'est pas dans le code n'existe pas. Cela inclut la landing zone elle-même.

```hcl
module "landing_zone" {
  source  = "aws-ia/control_tower_account_factory/aws"
  version = "~> 1.0"

  account_name  = "workload-prod"
  account_email = "aws+prod@monentreprise.com"
  ou_name       = "Workloads"
  sso_firstname = "Admin"
  sso_lastname  = "Prod"
}
```

### 3. Network design

Décidez dès le départ de votre plan d'adressage IP. Les conflits de CIDR entre VPCs sont douloureux à corriger en prod. Documentez votre choix.

### 4. Security baseline

- CloudTrail activé dans tous les comptes, logs centralisés
- AWS Config pour la conformité en continu
- GuardDuty pour la détection de menaces
- Security Hub pour la vue consolidée

## AWS Control Tower vs fait maison

AWS Control Tower est un bon point de départ pour les équipes qui démarrent. Il automatise les guardrails de base et les enrolled accounts.

Pour les organisations avec des exigences spécifiques (souveraineté des données, régulation bancaire…), une landing zone sur-mesure en Terraform donne plus de contrôle. C'est la voie que nous avons choisie chez CACD2 pour répondre aux exigences du Groupe Crédit Agricole.

## Le bon moment pour s'en préoccuper

**Maintenant.** Même si vous n'avez qu'un compte AWS et deux développeurs. Poser les fondations proprement dès le début — même simplement — évite les chantiers de refactoring cloud qui coûtent cher en temps, en argent et en nuits blanches.
