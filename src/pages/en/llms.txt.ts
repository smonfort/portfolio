import type { APIContext } from 'astro';
import { buildLlmsTxt } from '@utils/llmsTxt';

export const GET = (context: APIContext) => buildLlmsTxt('en', context.site!);
