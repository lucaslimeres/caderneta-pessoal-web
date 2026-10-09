# Caderneta Pessoal — Site

Landing page e páginas legais do app **Caderneta Pessoal**: [cadernetapessoal.com.br](https://cadernetapessoal.com.br).

Feito em **React**, com as páginas **pré-renderizadas em HTML** no build: cada página já chega pronta (boa para SEO, para os revisores das lojas e para quem tem internet lenta) e o React assume a navegação no navegador. Publicado na **Vercel**.

A identidade visual segue `docs/08-design-final.md` e `design/` do repositório [caderneta-pessoal-contexto](https://github.com/UBEN-Technology/caderneta-pessoal-contexto).

## Stack

- **React 19** + **TypeScript** + **Vite**
- **React Router** (modo biblioteca: `BrowserRouter` no navegador, `StaticRouter` na pré-renderização)
- CSS puro com os tokens do design (`src/styles/tokens.css` e `src/styles/site.css`)
- **Vitest** + **Testing Library** para testes

## Páginas

| Rota | Componente | Para quê |
|------|------------|----------|
| `/` | `HomePage` | Landing page |
| `/privacidade` | `PrivacyPage` | Política de Privacidade (exigida pela App Store e pela Google Play) |
| `/excluir-conta` | `DeleteAccountPage` | Exclusão de conta sem o app (exigida pela Google Play). Chama a API |
| `/suporte` | `SupportPage` | URL de suporte (exigida pela App Store) |
| qualquer outra | `NotFoundPage` | 404 |

Redirecionamentos: `/privacy`, `/privacy-policy`, `/delete-account` e `/support` apontam para as rotas em português (`vercel.json`).

## Rodando

```bash
npm install
npm run dev          # http://localhost:5173
```

| Script | O que faz |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento (sem pré-renderização) |
| `npm run build` | Build do cliente + pré-renderização das páginas em `dist/client` |
| `npm run preview` | Serve o build localmente |
| `npm test` | Testes (formulário de exclusão e pré-renderização) |
| `npm run typecheck` / `npm run lint` / `npm run format` | Tipos, ESLint e Prettier |

### API

A página `/excluir-conta` usa a API (`src/lib/api.ts`). A URL vem de `VITE_API_URL` e, se não for definida, usa `https://api.cadernetapessoal.com.br/v1`. Para testar com a API local:

```bash
echo "VITE_API_URL=http://localhost:3333/v1" > .env.local
```

e suba a API com `CORS_ORIGINS=http://localhost:5173`. Em produção, a API precisa ter `https://cadernetapessoal.com.br` em `CORS_ORIGINS`.

## Estrutura

```
├── index.html                 # template (o build injeta <head> e o HTML de cada página)
├── public/                    # arquivos estáticos: ícones, imagens, manifest, robots, sitemap
├── scripts/prerender.mjs      # gera dist/client/{index,privacidade,excluir-conta,suporte,404}.html
├── src/
│   ├── main.tsx               # entrada do navegador (hidrata o HTML pré-renderizado)
│   ├── entry-server.tsx       # entrada da pré-renderização (StaticRouter + renderToString)
│   ├── App.tsx                # rotas
│   ├── config.ts              # URLs, e-mails e links das lojas
│   ├── seo.ts                 # metatags por página (build) e título ao navegar (navegador)
│   ├── pages/                 # páginas + meta.ts (título e descrição de cada uma)
│   ├── components/            # Layout (cabeçalho/rodapé), FAQ, selos, formulário de exclusão, ícones
│   ├── lib/api.ts             # cliente da API
│   ├── styles/                # tokens e estilos
│   └── test/                  # testes
└── vercel.json                # build, URLs limpas, redirecionamentos, cache e cabeçalhos de segurança
```

### Adicionando uma página

1. Crie o componente em `src/pages/` e chame `usePageMeta(PAGES.suaPagina)`.
2. Adicione os metadados em `src/pages/meta.ts`.
3. Registre a rota em `src/App.tsx`.
4. Adicione o arquivo de saída em `scripts/prerender.mjs` (e no `public/sitemap.xml`, se for pública).

## Deploy (Vercel)

1. Importe este repositório na Vercel. O `vercel.json` já define `npm run build` e a pasta `dist/client`.
2. Configure o domínio `cadernetapessoal.com.br` (e `www` redirecionando para ele).
3. Opcional: defina `VITE_API_URL` nas variáveis de ambiente se a API mudar de endereço.

## Pendências antes de publicar

- [ ] **Política de Privacidade:** preencher razão social, CNPJ, endereço, nome do encarregado (DPO) e a data da última atualização (trechos com a classe `pendente` em `src/pages/PrivacyPage.tsx`). Revisão jurídica.
- [ ] **Selos das lojas:** trocar os botões provisórios de `src/components/StoreBadges.tsx` pelos selos oficiais ([Apple](https://developer.apple.com/app-store/marketing/guidelines/), [Google Play](https://play.google.com/intl/pt-BR/badges/)) e preencher `STORE_LINKS` em `src/config.ts`.
- [ ] **Smart App Banner do iOS:** adicionar `<meta name="apple-itunes-app" content="app-id=...">` em `index.html` com o ID do app.
- [ ] **Gerenciador de senhas:** quando o app tiver Team ID (Apple) e certificado de assinatura (Android), adicionar `public/.well-known/apple-app-site-association` e `public/.well-known/assetlinks.json`.
- [ ] **FAQ "O app é gratuito?":** ficou de fora até a decisão.
