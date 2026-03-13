---
title: "IaC à l'échelle : retour d'expérience sur Terraform en production"
description: "Gérer des centaines de ressources AWS avec Terraform pour un grand groupe bancaire — ce qui fonctionne, ce qui ne fonctionne pas, et les patterns qui sauvent la mise."
date: 2026-03-01
tags: ["Terraform", "IaC", "AWS", "DevOps"]
---

Chez CACD2, nous gérons l'infrastructure de plusieurs dizaines d'applications pour le Groupe Crédit Agricole avec Terraform. Voici les leçons apprises après plusieurs années d'IaC en conditions réelles.

## Le piège du monorepo Terraform

Le premier réflexe est de tout mettre dans un seul dépôt, avec un grand `main.tf`. Ça marche pour 20 ressources. À 500, le `terraform plan` prend 10 minutes, les états sont corrompus dès qu'on travaille à plusieurs, et chaque modification est une source de stress.

La bonne pratique : **décomposer en stacks indépendantes**.

```
infra/
  ├── landing-zone/     # Organisation, comptes, SCP
  ├── networking/       # VPCs, TGW, Route53
  ├── security/         # IAM, GuardDuty, Security Hub
  ├── platform/         # EKS, ECR, RDS partagés
  └── apps/
      ├── sofinco/
      └── lcl/
```

Chaque stack a son propre state, son propre cycle de vie. Un changement applicatif n'implique pas un plan sur toute l'infra.

## Remote state et locking

L'état Terraform doit être distant et verrouillé. Sur AWS, le combo S3 + DynamoDB est le standard :

```hcl
terraform {
  backend "s3" {
    bucket         = "mon-org-terraform-states"
    key            = "platform/eks/terraform.tfstate"
    region         = "eu-west-1"
    encrypt        = true
    dynamodb_table = "terraform-state-locks"
  }
}
```

Le chiffrement de l'état est non-négociable — il contient souvent des informations sensibles.

## Modules : DRY vs flexibilité

La tentation est de tout abstraire en modules. Résultat : des modules sur-génériques avec 50 variables, impossibles à maintenir.

Notre règle : **un module = un pattern qui se répète au moins 5 fois dans des contextes similaires**. Sinon, copiez et adaptez. La duplication est préférable à une abstraction prématurée.

```hcl
# Un bon module : simple, opinioné, peu de variables
module "ecs_service" {
  source = "../modules/ecs-service"

  name          = "api-sofinco"
  image         = "123456789.dkr.ecr.eu-west-1.amazonaws.com/api-sofinco:v1.2.3"
  cpu           = 512
  memory        = 1024
  desired_count = 2
}
```

## CI/CD Terraform avec GitLab-CI

Notre pipeline type :

1. **MR ouverte** → `terraform fmt` + `terraform validate` + `tflint` + plan commenté sur la MR
2. **Merge sur main** → `terraform apply` automatique sur l'environnement de staging
3. **Tag de release** → apply manuel (avec approbation) sur la production

Le plan commenté sur la MR est crucial : il permet une vraie revue de code infrastructure, pas juste du HCL.

## Gestion des secrets

Ne mettez **jamais** de secrets dans votre code Terraform, même dans les variables. Utilisez :

- **AWS Secrets Manager** ou **SSM Parameter Store** pour les secrets applicatifs
- Des rôles IAM pour l'authentification inter-services (pas de clés d'accès)
- **OIDC** pour l'authentification GitLab → AWS sans credentials statiques

## Le vrai problème : la gouvernance humaine

La partie technique est résoluble. La vraie difficulté à l'échelle, c'est d'aligner les équipes sur les conventions, de maintenir la qualité des reviews, et d'éviter que des ressources "à la main" dans la console AWS divergent de l'état Terraform.

La solution : des **guardrails automatisés** (conformance packs AWS Config, Sentinel pour Terraform Enterprise) et une culture d'équipe où la console est uniquement pour la lecture, jamais pour l'écriture.
