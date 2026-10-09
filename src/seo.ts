import { useEffect } from 'react';
import { SITE_URL } from './config';

export interface PageMeta {
  title: string;
  description: string;
  /** Caminho canônico, ex.: "/privacidade". */
  path: string;
  noindex?: boolean;
}

const OG_IMAGE = `${SITE_URL}/assets/img/og-image.png`;

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Tags do <head> de cada página, usadas na pré-renderização (build). */
export function renderHead(meta: PageMeta): string {
  const url = `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`;
  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="Caderneta Pessoal" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (meta.noindex) tags.push('<meta name="robots" content="noindex" />');
  return tags.join('\n    ');
}

/** Atualiza título e descrição ao navegar entre páginas no navegador. */
export function usePageMeta(meta: PageMeta): void {
  useEffect(() => {
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${SITE_URL}${meta.path}`);
  }, [meta]);
}
