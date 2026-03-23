import { getCollection } from 'astro:content';
import type { Lang } from '@i18n/index';

const config: Record<
  Lang,
  {
    collection: 'blogFr' | 'blogEn';
    blogBase: string;
    heading: string;
    tagline: string;
    bio: string;
    sectionsLabel: string;
    articlesLabel: string;
    homeLabel: string;
    homeDesc: string;
    blogLabel: string;
    blogDesc: string;
  }
> = {
  fr: {
    collection: 'blogFr',
    blogBase: '/blog',
    heading: 'Stéphane Monfort — CTO & Architecte Cloud',
    tagline:
      'Portfolio et blog de Stéphane Monfort, CTO et architecte cloud certifié AWS et TOGAF, diplômé de Centrale Lyon.',
    bio: "Stéphane Monfort est CTO et architecte cloud avec plus de 15 ans d'expérience dans la transformation des systèmes d'information. Il partage ses réflexions sur l'architecture cloud, les outils de développement et le leadership technique.",
    sectionsLabel: 'Pages principales',
    articlesLabel: 'Articles de blog',
    homeLabel: 'Accueil',
    homeDesc:
      'Présentation de Stéphane Monfort, ses compétences, son expérience et ses certifications.',
    blogLabel: 'Blog',
    blogDesc:
      "Articles sur l'architecture cloud, les outils de développement et le leadership tech.",
  },
  en: {
    collection: 'blogEn',
    blogBase: '/en/blog',
    heading: 'Stéphane Monfort — CTO & Cloud Architect',
    tagline:
      'Portfolio and blog of Stéphane Monfort, CTO and cloud architect certified AWS and TOGAF, graduate of Centrale Lyon.',
    bio: 'Stéphane Monfort is a CTO and cloud architect with over 15 years of experience in information system transformation. He shares his thoughts on cloud architecture, development tooling, and technical leadership.',
    sectionsLabel: 'Main pages',
    articlesLabel: 'Blog articles',
    homeLabel: 'Home',
    homeDesc: 'Introduction to Stéphane Monfort, his skills, experience, and certifications.',
    blogLabel: 'Blog',
    blogDesc: 'Articles on cloud architecture, development tools, and tech leadership.',
  },
};

export async function buildLlmsTxt(lang: Lang, site: URL): Promise<Response> {
  const c = config[lang];
  const siteUrl = site.toString().replace(/\/$/, '');
  const homeUrl = lang === 'fr' ? `${siteUrl}/` : `${siteUrl}/en/`;

  const posts = await getCollection(c.collection, ({ data }) => !data.draft);
  posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const lines = [
    `# ${c.heading}`,
    '',
    `> ${c.tagline}`,
    '',
    c.bio,
    '',
    `## ${c.sectionsLabel}`,
    '',
    `- [${c.homeLabel}](${homeUrl}): ${c.homeDesc}`,
    `- [${c.blogLabel}](${siteUrl}${c.blogBase}/): ${c.blogDesc}`,
    '',
    `## ${c.articlesLabel}`,
    '',
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${siteUrl}${c.blogBase}/${post.data.slug}/): ${post.data.description}`
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
