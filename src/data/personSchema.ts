import type { Lang } from '@i18n/index';

const jobTitles: Record<Lang, string> = {
  fr: 'CTO & Architecte Cloud Senior Freelance',
  en: 'Freelance CTO & Senior Cloud Architect',
};

export function getPersonSchema(siteUrl: URL, lang: Lang): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2026-03-01T00:00:00+01:00',
    dateModified: new Date().toISOString(),
    mainEntity: {
      '@type': 'Person',
      '@id': new URL('#person', siteUrl).toString(),
      name: 'Stéphane Monfort',
      image: 'https://avatars.githubusercontent.com/u/9880399?v=4',
      jobTitle: jobTitles[lang],
      url: siteUrl.href,
      email: 'stephane@monfort.pro',
      sameAs: ['https://www.linkedin.com/in/smonfort', 'https://github.com/smonfort'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Paris',
        addressRegion: 'Île-de-France',
        addressCountry: 'FR',
      },
      knowsAbout: [
        'Cloud Architecture',
        'AWS',
        'Kubernetes',
        'Tech Leadership',
        'DevOps',
        'Software Architecture',
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'AWS Certified Solutions Architect – Associate',
          credentialCategory: 'Professional Certification',
          recognizedBy: { '@type': 'Organization', name: 'Amazon Web Services' },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'TOGAF 9.1 Expert',
          credentialCategory: 'Professional Certification',
          recognizedBy: { '@type': 'Organization', name: 'The Open Group' },
        },
      ],
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'École Centrale de Lyon' },
        { '@type': 'Organization', name: 'IBM' },
        { '@type': 'Organization', name: 'Sopra Steria' },
        { '@type': 'Organization', name: 'Crédit Agricole Conseil et Développement Digital' },
      ],
    },
  });
}
