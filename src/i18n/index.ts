import fr from './fr';
import en from './en';

export type Lang = 'fr' | 'en';

const translations = { fr, en } as const;

export function useTranslations(lang: Lang) {
  return translations[lang];
}

/** Returns the base path prefix for a given locale. FR is at root, EN at /en */
export function getLangBase(lang: Lang): string {
  return lang === 'en' ? '/en' : '';
}

/** Returns the nav links with the correct hrefs for a given locale */
export function getNavLinks(lang: Lang) {
  const t = useTranslations(lang);
  const base = getLangBase(lang);
  return [
    { href: `${base}/#about`, label: t.nav.about },
    { href: `${base}/#skills`, label: t.nav.skills },
    { href: `${base}/#experience`, label: t.nav.experience },
    { href: `${base}/blog`, label: t.nav.blog },
    { href: `${base}/#contact`, label: t.nav.contact },
  ];
}

/** Returns the alternate locale for a given locale */
export function getAltLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}

/** Returns the equivalent path in the alternate locale */
export function getAltLangPath(lang: Lang, pathname: string): string {
  if (lang === 'fr') {
    return pathname === '/' ? '/en/' : `/en${pathname}`;
  }
  return pathname.replace(/^\/en/, '') || '/';
}
