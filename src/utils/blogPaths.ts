import { getCollection } from 'astro:content';

export async function getBlogStaticPaths<C extends 'blogFr' | 'blogEn'>(
  collection: C,
  base: string
) {
  const posts = await getCollection(collection, ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const toNavPost = (p: (typeof sorted)[number] | undefined) =>
    p ? { href: `${base}/${p.data.slug ?? p.id}`, title: p.data.title } : undefined;

  return sorted.map((post, index) => ({
    params: { slug: post.data.slug ?? post.id },
    props: {
      post,
      prevPost: toNavPost(sorted[index + 1]),
      nextPost: toNavPost(sorted[index - 1]),
    },
  }));
}
