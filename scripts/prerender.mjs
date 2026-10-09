// Gera um HTML estático por página a partir do build do React (SSG).
// Cada arquivo já vem com o conteúdo e as metatags; no navegador, o React só "hidrata" a página.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const clientDir = `${root}dist/client`;
const { render, PAGES, renderHead } = await import(`${root}dist/server/entry-server.js`);

const template = await readFile(`${clientDir}/index.html`, 'utf8');

// Rota → arquivo. Na Vercel, cleanUrls serve /privacidade a partir de privacidade.html.
const OUTPUT = {
  '/': 'index.html',
  '/privacidade': 'privacidade.html',
  '/excluir-conta': 'excluir-conta.html',
  '/suporte': 'suporte.html',
  '/404': '404.html',
};

for (const meta of Object.values(PAGES)) {
  const file = OUTPUT[meta.path];
  if (!file) throw new Error(`Página sem arquivo de saída: ${meta.path}`);
  const html = template.replace('<!--app-head-->', renderHead(meta)).replace('<!--app-html-->', render(meta.path));
  await writeFile(`${clientDir}/${file}`, html);
  console.log(`  ✓ ${meta.path} → ${file}`);
}

// O bundle de servidor só serve para gerar o HTML; não vai para a Vercel.
await rm(`${root}dist/server`, { recursive: true, force: true });
