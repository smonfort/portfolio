import type { Translations } from './fr';

const en: Translations = {
  layout: {
    lang: 'en',
    ogLocale: 'en_US',
    skipToContent: 'Skip to main content',
    defaultDescription:
      'Freelance CTO & senior cloud architect based in Paris, with 18 years of experience, AWS and TOGAF certified. I help your tech teams through their transformation projects.',
    rssTitle: 'Stéphane Monfort — Blog',
  },

  nav: {
    ariaLabel: 'Main navigation',
    about: 'About',
    skills: 'Expertise',
    experience: 'Experience',
    blog: 'Blog',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLang: 'Passer en français',
  },

  hero: {
    available: 'Available for new projects',
    subtitle: 'CTO - Senior Cloud Architect',
    description:
      '18 years of experience in complex systems architecture and technical team leadership. I help you structure your IT, accelerate your cloud migration and grow your teams.',
    cta: 'My experience',
    contact: 'Contact me',
  },

  about: {
    label: 'About',
    heading: 'End-to-end tech expertise, from IT strategy to product delivery',
    p1: 'I built my expertise over the past 18 years, from software architect at IBM to executive committee member at CACD2, the digital factory of Crédit Agricole Group, where I served as CTO for 7 years.',
    p2Html: `What sets me apart: a <span class="font-medium text-white">broad scope of action</span>. <span class="font-medium text-white">Hands-on</span> when needed, I can define and implement complex architectures, challenge technical choices and co-design solutions with teams. I also bring a strong <span class="font-medium text-white">strategic vision</span>, ensuring technology is aligned with business goals.`,
    stats: [
      { value: '18+', emoji: '🗓️', label: 'years of experience' },
      { value: '45+', emoji: '👥', label: 'FTEs managed' },
      { value: '8+', emoji: '☁️', label: 'years of AWS experience' },
      { value: '3', emoji: '🏆', label: 'certifications' },
      { value: '50+', emoji: '🚀', label: 'projects delivered' },
      { value: '100%', emoji: '🔥', label: 'passionate' },
    ],
  },

  skills: {
    label: 'Expertise',
    heading: 'My main areas of expertise',
    certLabel: 'Certifications',
    certHeading: 'Professional certifications',
    certAriaOpen: '(opens in a new tab)',
    categories: {
      leadership: 'Leadership',
      cloud: 'Cloud',
      cicd: 'CI/CD',
      security: 'Security',
      frontend: 'Frontend',
      backend: 'Backend',
      dataAi: 'Data & AI',
      tooling: 'Tooling',
    },
    items: {
      // Leadership
      techLeadership: 'Tech Leadership',
      solutionArchitecture: 'Solution Architecture',
      businessOrientation: 'Business Focus',
      agility: 'Agility',
      designThinking: 'Design Thinking',
      itConsulting: 'IT Consulting',
      recruiting: 'Recruiting',
      mentoring: 'Mentoring',
      // Cloud
      aws: 'AWS',
      docker: 'Docker',
      kubernetes: 'Kubernetes',
      terraform: 'Terraform',
      pulumi: 'Pulumi',
      lambda: 'Lambda',
      eks: 'EKS',
      ec2: 'EC2',
      ecs: 'ECS',
      stepFunctions: 'Step Functions',
      rds: 'RDS',
      s3: 'S3',
      sqs: 'SQS',
      landingZone: 'Landing Zone',
      finops: 'FinOps',
      // CI/CD
      gitops: 'GitOps',
      gitlabCi: 'GitLab CI',
      argocd: 'Argo CD',
      helm: 'Helm',
      sonarqube: 'SonarQube',
      harbor: 'Harbor',
      renovate: 'Renovate',
      n8n: 'n8n',
      semanticRelease: 'Semantic Release',
      // Security
      devsecops: 'DevSecOps',
      zeroTrust: 'Zero Trust',
      owasp: 'OWASP',
      vault: 'Vault',
      dependencyTrack: 'Dependency-Track',
      trivy: 'Trivy',
      awsIam: 'AWS IAM',
      oidc: 'OIDC',
      waf: 'WAF',
      wazuh: 'Wazuh',
      sast: 'SAST',
      dast: 'DAST',
      // Frontend
      react: 'React',
      nextjs: 'Next.js',
      vuejs: 'Vue.js',
      nuxt: 'Nuxt',
      astro: 'Astro',
      tailwind: 'Tailwind CSS',
      // Backend
      springBoot: 'Spring Boot',
      nodejs: 'Node.js',
      nestjs: 'NestJS',
      graphql: 'GraphQL',
      restApi: 'REST API',
      trpc: 'tRPC',
      go: 'Go',
      keycloak: 'Keycloak',
      // Data & AI
      postgresql: 'PostgreSQL',
      mongodb: 'MongoDB',
      kafka: 'Kafka',
      elasticsearch: 'ElasticSearch',
      redis: 'Redis',
      dynamodb: 'DynamoDB',
      datocms: 'DatoCMS',
      athena: 'Athena',
      bedrock: 'Bedrock',
      githubCopilot: 'GitHub Copilot',
      claudeCode: 'Claude Code',
      // Tooling
      git: 'Git',
      lazygit: 'Lazygit',
      github: 'GitHub',
      gitlab: 'GitLab',
      jira: 'Jira',
      confluence: 'Confluence',
      notion: 'Notion',
      neovim: 'Neovim',
      tmux: 'Tmux',
      k9s: 'k9s',
      bruno: 'Bruno',
    },
    certifications: {
      aws: {
        name: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
      },
      togaf: {
        name: 'TOGAF 9.1 Expert',
        issuer: 'The Open Group',
      },
      claudeCode: {
        name: 'Claude Code in Actions',
        issuer: 'Anthropic',
      },
    },
  },

  experience: {
    label: 'Experience',
    heading: 'Professional experience',
    items: [
      {
        title: 'Chief Technical Officer',
        company: 'Crédit Agricole Conseil et Développement Digital',
        logo: '/logos/cacd2.png',
        period: '2018 – 2026',
        bullets: [
          "Founding member of the executive committee of Crédit Agricole Group's digital factory.",
          'Led the Technology department: 40 FTE (architects, front/back/mobile developers, QA, DevOps, cybersecurity).',
          'Defined and implemented the public cloud AWS/Azure strategy: private landing zone, at-scale infrastructure-as-code in Terraform.',
          'Designed cloud-native architectures for Sofinco, LCL, CAA, CASA, CA-Titres, CA-PS, CAL&F, and CATE.',
          'Business development: pre-sales, scoping, due diligences — €11.3M revenue in 2024.',
        ],
        tags: ['Tech management', 'Architecture', 'AWS', 'Kubernetes', 'Cloud Native', 'DevSecOps'],
      },
      {
        title: 'Solutions Architect — Manager',
        company: 'Sopra-Stéria',
        logo: '/logos/sopra-steria.png',
        period: '2014 – 2018',
        bullets: [
          'Manager within the Public Sector Business Unit.',
          'Lead Sopra-Stéria architect for the French General Directorate of Public Finance.',
          'Built from scratch the Pay-As-You-Earn tax withholding system and the Nominative Social Declaration.',
          'Continuous improvement of the online income tax filing system, responsible for the performance stream.',
        ],
        tags: ['Enterprise Architecture', 'Public Sector', 'Performance', 'Open Source'],
      },
      {
        title: 'Solutions Architect',
        company: 'IBM Global Business Services',
        logo: '/logos/ibm.png',
        period: '2008 – 2014',
        bullets: [
          "Fullstack developer then software architect within IBM GBS France's Application Innovation Services division.",
          'International build projects in energy, media, and defense.',
          'Expertise in SOA architecture security and IBM DataPower appliance.',
          'EMEA Graduate Program — international training over 12 months.',
        ],
        tags: ['SOA', 'IBM DataPower', 'Software Architecture', 'Full-stack Dev'],
      },
      {
        title: 'General Engineer',
        company: 'École Centrale de Lyon',
        logo: '/logos/centrale-lyon.png',
        period: '2005 – 2008',
        bullets: ['General engineering degree with a specialization in information systems.'],
        tags: ['Engineering', 'Computer Science', 'Information Systems'],
      },
    ],
  },

  contact: {
    label: 'Contact',
    heading: "Let's start a project together",
    description:
      "Need an interim CTO, a senior cloud architect or an expert eye on your IT? Let's talk.",
    emailCta: 'Contact me by email',
    emailSubject: 'Getting%20in%20touch',
    linkedinCta: 'Contact me on LinkedIn',
    linkedinAriaLabel: 'Contact me on LinkedIn (opens in a new tab)',
  },

  blog: {
    label: 'Blog',
    previewHeading: 'Latest articles',
    seeAll: 'See all →',
    seeAllMobile: 'See all articles →',
    listHeading: 'All articles',
    listDescription:
      'Experience reports, experiments and perspectives on cloud, architecture and tech leadership.',
    noArticles: 'No articles published yet.',
    dateLocale: 'en-US',
  },

  blogPost: {
    backToAll: 'See all articles',
    readingTime: (n: number) => `${n} min read`,
    share: 'Share',
    copyLinkAriaLabel: 'Copy article link',
    copied: 'Link copied to clipboard',
    prevPost: 'Previous article',
    nextPost: 'Next article',
    navAriaLabel: 'Article navigation',
    commentsAriaLabel: 'Comments',
    commentsHeading: 'Comments',
    shareLinkedInAriaLabel: (title: string) => `Share "${title}" on LinkedIn (opens in a new tab)`,
    shareTwitterAriaLabel: (title: string) => `Share "${title}" on X/Twitter (opens in a new tab)`,
    breadcrumb: { home: 'Home', blog: 'Blog' },
    inLanguage: 'en-US',
    giscusLang: 'en',
  },

  pages: {
    home: {
      title: 'Stéphane Monfort — Freelance CTO & Senior Cloud Architect in Paris',
      description:
        'Freelance CTO & Senior Cloud Architect based in Paris, AWS and TOGAF certified. 18 years of experience in complex systems architecture and tech team leadership. Available for cloud transformation projects in Île-de-France and remote.',
    },
    blog: {
      title: 'Blog — Cloud, Architecture & Tech Leadership | Stéphane Monfort',
      description:
        'Experience reports and reflections on AWS cloud, enterprise architecture and technical leadership.',
    },
    notFound: {
      title: 'Page not found — Stéphane Monfort',
      description: 'This page does not exist or has been moved.',
      heading: 'Page not found',
      body: "This page doesn't exist or has been moved. Don't panic.",
      backHome: 'Back to home',
      seeBlog: 'See the blog',
    },
  },
};

export default en;
