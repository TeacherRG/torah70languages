// Verifies that every UI locale has exactly the same keys as English (the source of truth).
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/locales/', import.meta.url).pathname;
const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' ? flatten(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );

const base = 'en';
const namespaces = readdirSync(join(root, base)).filter((f) => f.endsWith('.json'));
const locales = readdirSync(root).filter((d) => d !== base);
let failed = false;

for (const ns of namespaces) {
  const ref = new Set(flatten(JSON.parse(readFileSync(join(root, base, ns), 'utf8'))));
  for (const locale of locales) {
    let keys;
    try {
      keys = new Set(flatten(JSON.parse(readFileSync(join(root, locale, ns), 'utf8'))));
    } catch {
      console.error(`✗ ${locale}/${ns} is missing`);
      failed = true;
      continue;
    }
    const missing = [...ref].filter((k) => !keys.has(k));
    const extra = [...keys].filter((k) => !ref.has(k));
    if (missing.length || extra.length) {
      failed = true;
      console.error(`✗ ${locale}/${ns}`, { missing, extra });
    }
  }
}

console.log(failed ? 'Locale check failed.' : `✓ ${locales.length + 1} locales × ${namespaces.length} namespaces in sync.`);
process.exit(failed ? 1 : 0);
