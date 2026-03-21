export function getReadingTime(body: string | undefined): number {
  const wordCount = body?.split(/\s+/).filter(Boolean).length ?? 0;
  return Math.max(1, Math.round(wordCount / 200));
}
