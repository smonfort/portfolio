const fr = {
  layout: {
    lang: 'fr',
    ogLocale: 'fr_FR',
    skipToContent: 'Aller au contenu principal',
    defaultDescription:
      "CTO freelance & architecte cloud senior basé à Paris, avec 18 ans d'expérience, certifié AWS et TOGAF. J'accompagne vos équipes tech sur leurs projets de transformation.",
    rssTitle: 'Stéphane Monfort — Blog',
  },

  nav: {
    ariaLabel: 'Navigation principale',
    about: 'À propos',
    skills: 'Expertises',
    experience: 'Références',
    blog: 'Blog',
    contact: 'Contact',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    switchLang: 'Switch to English',
  },

  hero: {
    available: 'Disponible pour de nouvelles missions',
    subtitle: 'CTO - Architecte cloud sénior',
    description:
      "18 ans d'expérience en architecture de systèmes complexes et leadership d'équipes techniques. Je vous accompagne pour structurer votre SI, accélérer votre migration cloud et faire grandir vos équipes.",
    cta: 'Mon parcours',
    contact: 'Me contacter',
  },

  about: {
    label: 'À propos',
    heading: 'Une expertise tech de bout de bout, de la stratégie IT au delivery produit',
    p1: "J'ai construit mon expertise sur ces 18 dernières années, d'architecte logiciel chez IBM à membre du comité de direction de CACD2, la digital factory du Groupe Crédit Agricole SA, où j'ai exercé les fonctions de CTO pendant 7 ans.",
    p2Html: `Ce qui me différencie : un <span class="font-medium text-white">large spectre d'intervention</span>. <span class="font-medium text-white">Hands-on</span> si nécessaire, je peux définir et mettre en oeuvre des architectures complexes, challenger les choix techniques et co-concevoir une solution avec les équipes. Je dispose également d'une <span class="font-medium text-white">vision stratégique</span> affirmée en veillant à aligner la technologie sur les enjeux business.`,
    stats: [
      { value: '18+', emoji: '🗓️', label: "années d'expérience" },
      { value: '45+', emoji: '👥', label: 'ETP managés' },
      { value: '8+', emoji: '☁️', label: "années d'expérience sur AWS" },
      { value: '3', emoji: '🏆', label: 'certifications' },
      { value: '50+', emoji: '🚀', label: 'projets livrés' },
      { value: '100%', emoji: '🔥', label: 'passionné' },
    ],
  },

  skills: {
    label: 'Expertise',
    heading: "Mes principaux domaines d'expertise",
    certLabel: 'Certifications',
    certHeading: 'Certifications professionnelles',
    certAriaOpen: '(ouvre dans un nouvel onglet)',
  },

  experience: {
    label: 'Références',
    heading: 'Expériences professionnelles',
    items: [
      {
        title: 'Chief Technical Officer',
        company: 'Crédit Agricole Conseil et Développement Digital',
        logo: '/logos/cacd2.png',
        period: '2018 – 2026',
        bullets: [
          'Membre fondateur du comité de direction de la digital factory du Groupe Crédit Agricole S.A.',
          'Direction du département Technologies : 40 ETP (architectes, développeurs front/back/mobile, QA, DevOps, cybersécurité).',
          "Définition et mise en œuvre de la stratégie cloud public AWS/Azure : landing zone privative, infrastructure-as-code à l'échelle en Terraform.",
          "Conception d'architectures cloud native pour Sofinco, LCL, CAA, CASA, CA-Titres, CA-PS, CAL&F, CATE.",
          'Développement business : avant-vente, cadrage, due diligences — 11,3M€ de CA en 2024.',
        ],
        tags: ['Tech management', 'Architecture', 'AWS', 'Kubernetes', 'Cloud Native', 'DevSecOps'],
      },
      {
        title: 'Architecte SI — Manager',
        company: 'Sopra-Stéria',
        logo: '/logos/sopra-steria.png',
        period: '2014 – 2018',
        bullets: [
          'Manager au sein de la Business Unit Secteur Public.',
          'Lead architecte Sopra-Stéria pour la Direction Générale des Finances Publiques.',
          'Conception from scratch du prélèvement à la source et de la Déclaration Sociale Nominative.',
          "Amélioration continue de la télédéclaration de l'impôt sur le revenu, en charge du chantier performance.",
        ],
        tags: ['Architecture SI', 'Secteur Public', 'Performance', 'Open Source'],
      },
      {
        title: 'Architecte SI',
        company: 'IBM Global Business Services',
        logo: '/logos/ibm.png',
        period: '2008 – 2014',
        bullets: [
          "Développeur fullstack puis architecte logiciel au sein de la Division Application Innovation Services d'IBM GBS France.",
          "Projets de build internationaux dans l'énergie, les médias et la défense.",
          "Expertise en sécurisation d'architecture SOA et appliance IBM DataPower.",
          'Graduate Program EMEA — formations internationales sur 12 mois.',
        ],
        tags: ['SOA', 'IBM DataPower', 'Architecture logicielle', 'Dev fullstack'],
      },
      {
        title: 'Ingénieur généraliste',
        company: 'École Centrale de Lyon',
        logo: '/logos/centrale-lyon.png',
        period: '2005 – 2008',
        bullets: [
          "Formation d'ingénieur généraliste avec spécialisation en systèmes d'information.",
        ],
        tags: ['Ingénierie', 'Informatique', "Systèmes d'information"],
      },
    ],
  },

  contact: {
    label: 'Contact',
    heading: 'Démarrons une mission ensemble',
    description:
      "Besoin d'un CTO de transition, d'un architecte cloud sénior ou d'un regard expert sur votre SI ? Discutons-en.",
    emailCta: 'Me contacter par mail',
    emailSubject: 'Prise%20de%20contact',
    linkedinCta: 'Me contacter sur LinkedIn',
    linkedinAriaLabel: 'Me contacter sur LinkedIn (ouvre dans un nouvel onglet)',
  },

  blog: {
    label: 'Blog',
    previewHeading: 'Derniers articles',
    seeAll: 'Voir tout →',
    seeAllMobile: 'Voir tous les articles →',
    listHeading: 'Tous les articles',
    listDescription:
      "Retours d'expérience, expérimentations et points de vue sur le cloud, l'architecture et le leadership tech.",
    noArticles: "Aucun article publié pour l'instant.",
    dateLocale: 'fr-FR',
  },

  blogPost: {
    backToAll: 'Voir tous les articles',
    readingTime: (n: number) => `${n} min de lecture`,
    share: 'Partager',
    copyLinkAriaLabel: "Copier le lien de l'article",
    copied: 'Lien copié dans le presse-papiers',
    prevPost: 'Article précédent',
    nextPost: 'Article suivant',
    navAriaLabel: 'Navigation entre articles',
    commentsAriaLabel: 'Commentaires',
    commentsHeading: 'Commentaires',
    shareLinkedInAriaLabel: (title: string) =>
      `Partager "${title}" sur LinkedIn (ouvre dans un nouvel onglet)`,
    shareTwitterAriaLabel: (title: string) =>
      `Partager "${title}" sur X/Twitter (ouvre dans un nouvel onglet)`,
    breadcrumb: { home: 'Accueil', blog: 'Blog' },
    inLanguage: 'fr-FR',
    giscusLang: 'fr',
  },

  pages: {
    home: {
      title: 'Stéphane Monfort — CTO & Architecte Cloud Senior Freelance à Paris',
      description:
        "CTO & Architecte Cloud Senior freelance basé à Paris, certifié AWS et TOGAF. 18 ans d'expérience en architecture de systèmes complexes et leadership d'équipes tech. Disponible pour vos missions de transformation cloud en Île-de-France et à distance.",
    },
    blog: {
      title: 'Blog — Cloud, Architecture & Leadership Tech | Stéphane Monfort',
      description:
        "Retours d'expérience et réflexions sur le cloud AWS, l'architecture SI et le leadership technique.",
    },
    notFound: {
      title: 'Page introuvable — Stéphane Monfort',
      description: "Cette page n'existe pas ou a été déplacée.",
      heading: 'Page introuvable',
      body: "Cette page n'existe pas ou a été déplacée. Pas de panique.",
      backHome: "Retour à l'accueil",
      seeBlog: 'Voir le blog',
    },
  },
};

export default fr;
export type Translations = typeof fr;
