#!/usr/bin/env node
/**
 * Pre-commit hook: updates `updatedDate` in the frontmatter of staged blog posts.
 * Runs before lint-staged so Prettier formats the final result.
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const staged = execSync('git diff --cached --name-only', { encoding: 'utf-8' })
  .split('\n')
  .filter((f) => f.startsWith('src/content/blog/') && f.endsWith('.md'));

for (const file of staged) {
  const content = readFileSync(file, 'utf-8');

  // Match the YAML frontmatter block
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) continue;

  const frontmatter = match[1];
  let updated;

  if (/^updatedDate:/m.test(frontmatter)) {
    // Replace existing value
    updated = content.replace(/^updatedDate:.*$/m, `updatedDate: ${today}`);
  } else {
    // Insert after the `date:` line
    updated = content.replace(/^(date:.*)$/m, `$1\nupdatedDate: ${today}`);
  }

  if (updated !== content) {
    writeFileSync(file, updated, 'utf-8');
    execSync(`git add ${JSON.stringify(file)}`);
    console.log(`updated updatedDate → ${today} in ${file}`);
  }
}
