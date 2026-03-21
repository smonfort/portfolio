export type ExpertiseItem = {
  key: string;
  label: string;
  icon?: string;
  iconUrl?: string;
  svg?: string;
};

export type ExpertiseCategory = {
  key: string;
  label: string;
  categorySvg: string;
  items: ExpertiseItem[];
};

export const expertisesData: ExpertiseCategory[] = [
  {
    key: 'leadership',
    label: 'Leadership',
    categorySvg:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />',
    items: [
      {
        key: 'techLeadership',
        label: 'Tech Leadership',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />',
      },
      {
        key: 'solutionArchitecture',
        label: 'Solution Architecture',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />',
      },
      {
        key: 'businessOrientation',
        label: 'Business Focus',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />',
      },
      {
        key: 'agility',
        label: 'Agility',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />',
      },
      {
        key: 'designThinking',
        label: 'Design Thinking',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />',
      },
      {
        key: 'itConsulting',
        label: 'IT Consulting',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />',
      },
      {
        key: 'recruiting',
        label: 'Recruiting',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />',
      },
      {
        key: 'mentoring',
        label: 'Mentoring',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />',
      },
    ],
  },
  {
    key: 'cloud',
    label: 'Cloud',
    categorySvg:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />',
    items: [
      {
        key: 'aws',
        label: 'AWS',
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
      },
      { key: 'docker', label: 'Docker', icon: 'docker' },
      { key: 'kubernetes', label: 'Kubernetes', icon: 'kubernetes' },
      { key: 'terraform', label: 'Terraform', icon: 'terraform' },
      { key: 'pulumi', label: 'Pulumi', icon: 'pulumi' },
      {
        key: 'lambda',
        label: 'Lambda',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5h2l3 6-5 8h3l3.5-5.5L14 19h3L9 5H4z" />',
      },
      {
        key: 'eks',
        label: 'EKS',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />',
      },
      {
        key: 'ec2',
        label: 'EC2',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12H3m2 0a9 9 0 1018 0 9 9 0 00-18 0zm7-9v2m0 14v2m7-9h2M3 12h2m12.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M18.364 18.364l-1.414-1.414M7.05 7.05L5.636 5.636" />',
      },
      {
        key: 'ecs',
        label: 'ECS',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />',
      },
      {
        key: 'stepFunctions',
        label: 'Step Functions',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />',
      },
      {
        key: 'rds',
        label: 'RDS',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7c0-1.657 3.582-3 8-3s8 1.343 8 3v2c0 1.657-3.582 3-8 3s-8-1.343-8-3V7zm0 5c0 1.657 3.582 3 8 3s8-1.343 8-3m-16 5c0 1.657 3.582 3 8 3s8-1.343 8-3v-5" />',
      },
      {
        key: 's3',
        label: 'S3',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />',
      },
      {
        key: 'sqs',
        label: 'SQS',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l-3-3m3 3l3-3" />',
      },
      {
        key: 'landingZone',
        label: 'Landing Zone',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />',
      },
      {
        key: 'finops',
        label: 'FinOps',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
      },
    ],
  },
  {
    key: 'cicd',
    label: 'CI/CD',
    categorySvg:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />',
    items: [
      {
        key: 'gitops',
        label: 'GitOps',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />',
      },
      { key: 'gitlabCi', label: 'GitLab CI', icon: 'gitlab' },
      { key: 'argocd', label: 'Argo CD', icon: 'argo' },
      { key: 'helm', label: 'Helm', iconUrl: 'https://cdn.simpleicons.org/helm/ffffff' },
      {
        key: 'sonarqube',
        label: 'SonarQube',
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sonarqube/sonarqube-original.svg',
      },
      { key: 'harbor', label: 'Harbor', icon: 'harbor' },
      { key: 'renovate', label: 'Renovate', icon: 'renovate' },
      { key: 'n8n', label: 'n8n', icon: 'n8n' },
      { key: 'semanticRelease', label: 'Semantic Release', icon: 'semanticrelease' },
    ],
  },
  {
    key: 'security',
    label: 'Security',
    categorySvg:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />',
    items: [
      {
        key: 'devsecops',
        label: 'DevSecOps',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />',
      },
      {
        key: 'zeroTrust',
        label: 'Zero Trust',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />',
      },
      { key: 'owasp', label: 'OWASP', iconUrl: 'https://cdn.simpleicons.org/owasp/ffffff' },
      { key: 'vault', label: 'Vault', iconUrl: 'https://cdn.simpleicons.org/vault/ffffff' },
      {
        key: 'dependencyTrack',
        label: 'Dependency-Track',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />',
      },
      { key: 'trivy', label: 'Trivy', iconUrl: '/logos/logo-trivy.png' },
      {
        key: 'awsIam',
        label: 'AWS IAM',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />',
      },
      {
        key: 'oidc',
        label: 'OIDC',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />',
      },
      {
        key: 'waf',
        label: 'WAF',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />',
      },
      { key: 'wazuh', label: 'Wazuh', iconUrl: 'https://wazuh.com/favicon.ico' },
      {
        key: 'sast',
        label: 'SAST',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />',
      },
      {
        key: 'dast',
        label: 'DAST',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />',
      },
    ],
  },
  {
    key: 'frontend',
    label: 'Frontend',
    categorySvg:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />',
    items: [
      { key: 'react', label: 'React', icon: 'react' },
      { key: 'nextjs', label: 'Next.js', iconUrl: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
      { key: 'vuejs', label: 'Vue.js', icon: 'vuedotjs' },
      {
        key: 'nuxt',
        label: 'Nuxt',
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg',
      },
      { key: 'astro', label: 'Astro', icon: 'astro' },
      { key: 'tailwind', label: 'Tailwind CSS', icon: 'tailwindcss' },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    categorySvg:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm0 9a2 2 0 012-2h12a2 2 0 012 2v1a2 2 0 01-2 2H6a2 2 0 01-2-2v-1zm3-6.5h.01M7 15.5h.01" />',
    items: [
      { key: 'springBoot', label: 'Spring Boot', icon: 'spring' },
      { key: 'nodejs', label: 'Node.js', icon: 'nodedotjs' },
      { key: 'nestjs', label: 'NestJS', icon: 'nestjs' },
      { key: 'graphql', label: 'GraphQL', icon: 'graphql' },
      {
        key: 'restApi',
        label: 'REST API',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />',
      },
      { key: 'trpc', label: 'tRPC', icon: 'trpc' },
      { key: 'go', label: 'Go', icon: 'go' },
      {
        key: 'keycloak',
        label: 'Keycloak',
        iconUrl: 'https://cdn.simpleicons.org/keycloak/ffffff',
      },
    ],
  },
  {
    key: 'dataAi',
    label: 'Data & AI',
    categorySvg:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />',
    items: [
      { key: 'postgresql', label: 'PostgreSQL', icon: 'postgresql' },
      { key: 'mongodb', label: 'MongoDB', icon: 'mongodb' },
      { key: 'kafka', label: 'Kafka', iconUrl: 'https://cdn.simpleicons.org/apachekafka/ffffff' },
      { key: 'elasticsearch', label: 'ElasticSearch', icon: 'elasticsearch' },
      {
        key: 'redis',
        label: 'Redis',
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
      },
      {
        key: 'dynamodb',
        label: 'DynamoDB',
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dynamodb/dynamodb-original.svg',
      },
      { key: 'datocms', label: 'DatoCMS', icon: 'datocms' },
      {
        key: 'athena',
        label: 'Athena',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />',
      },
      {
        key: 'bedrock',
        label: 'Bedrock',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />',
      },
      {
        key: 'githubCopilot',
        label: 'GitHub Copilot',
        iconUrl: 'https://cdn.simpleicons.org/githubcopilot/ffffff',
      },
      {
        key: 'claudeCode',
        label: 'Claude Code',
        iconUrl: 'https://cdn.simpleicons.org/anthropic/a5b4fc',
      },
    ],
  },
  {
    key: 'tooling',
    label: 'Tooling',
    categorySvg:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />',
    items: [
      { key: 'git', label: 'Git', icon: 'git' },
      {
        key: 'lazygit',
        label: 'Lazygit',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />',
      },
      { key: 'github', label: 'GitHub', iconUrl: 'https://cdn.simpleicons.org/github/ffffff' },
      { key: 'gitlab', label: 'GitLab', icon: 'gitlab' },
      { key: 'jira', label: 'Jira', icon: 'jira' },
      { key: 'confluence', label: 'Confluence', icon: 'confluence' },
      { key: 'notion', label: 'Notion', iconUrl: 'https://cdn.simpleicons.org/notion/ffffff' },
      { key: 'neovim', label: 'Neovim', icon: 'neovim' },
      { key: 'tmux', label: 'Tmux', icon: 'tmux' },
      {
        key: 'k9s',
        label: 'k9s',
        svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />',
      },
      { key: 'bruno', label: 'Bruno', icon: 'bruno' },
    ],
  },
];

export const certificationsData = [
  {
    key: 'aws',
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
    link: 'https://www.credly.com/badges/aa0dde9d-3422-4f16-8be8-352c315a5328/linked_in_profile',
  },
  {
    key: 'togaf',
    name: 'TOGAF 9.1 Expert',
    issuer: 'The Open Group',
    iconUrl: '/logos/open-group.png',
    link: null,
  },
  {
    key: 'claudeCode',
    name: 'Claude Code in Actions',
    issuer: 'Anthropic',
    iconUrl: 'https://cdn.simpleicons.org/anthropic/a5b4fc',
    link: 'https://verify.skilljar.com/c/ryfgo2hwz8ap',
  },
] as const;
