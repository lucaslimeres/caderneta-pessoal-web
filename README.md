# Caderneta Pessoal — Site

Landing page e páginas legais do app **Caderneta Pessoal**: [cadernetapessoal.com.br](https://cadernetapessoal.com.br).

Site estático (HTML + CSS + um pouco de JS), sem build, publicado na **Vercel**. A identidade visual segue `docs/08-design-final.md` e `design/` do repositório [caderneta-pessoal-contexto](https://github.com/UBEN-Technology/caderneta-pessoal-contexto).

## Páginas

| Rota | Arquivo | Para quê |
|------|---------|----------|
| `/` | `index.html` | Landing page |
| `/privacidade` | `privacidade.html` | Política de Privacidade (exigida pela App Store e pela Google Play) |
| `/excluir-conta` | `excluir-conta.html` | Exclusão de conta sem o app (exigida pela Google Play). Chama a API |
| `/suporte` | `suporte.html` | URL de suporte (exigida pela App Store) |

Redirecionamentos: `/privacy`, `/privacy-policy`, `/delete-account` e `/support` apontam para as rotas em português (`vercel.json`).

## Estrutura

```
├── index.html, privacidade.html, excluir-conta.html, suporte.html, 404.html
├── assets/
│   ├── css/tokens.css     # cores, fontes e espaçamentos (copiado de design/tokens, com modo escuro)
│   ├── css/site.css       # estilos do site
│   ├── js/excluir-conta.js
│   ├── icons/             # favicons e ícones do manifest
│   └── img/               # símbolo, imagem Open Graph e telas do app (WebP)
├── site.webmanifest, robots.txt, sitemap.xml, favicon.ico
└── vercel.json            # URLs limpas, redirecionamentos, cache e cabeçalhos de segurança (CSP)
```

O cabeçalho e o rodapé se repetem em cada página. Ao mudar um, atualize todos.

## Rodando localmente

```bash
npx serve .          # ou: python3 -m http.server 4000
```

Localmente as URLs têm `.html` (ex.: `/privacidade.html`); na Vercel ficam sem extensão.

A página `/excluir-conta` chama a API definida em `data-api` no formulário (`https://api.cadernetapessoal.com.br/v1`). Para testar com a API local, troque para `http://localhost:3333/v1` e suba a API com `CORS_ORIGINS=http://localhost:4000`. A API também precisa ter `https://cadernetapessoal.com.br` em `CORS_ORIGINS` em produção.

## Deploy (Vercel)

1. Importe este repositório na Vercel (framework: **Other**, sem build command, output: raiz).
2. Configure o domínio `cadernetapessoal.com.br` (e `www` redirecionando para ele).

## Pendências antes de publicar

- [ ] **Política de Privacidade:** preencher razão social, CNPJ, endereço, nome do encarregado (DPO) e a data da última atualização (trechos destacados em `privacidade.html`, classe `pendente`). Revisão jurídica.
- [ ] **Selos das lojas:** trocar os botões provisórios pelos selos oficiais ([Apple](https://developer.apple.com/app-store/marketing/guidelines/), [Google Play](https://play.google.com/intl/pt-BR/badges/)) e apontar os links (`data-store="app-store"` e `data-store="google-play"`, em `index.html`) para as páginas do app nas lojas.
- [ ] **Smart App Banner do iOS:** descomentar `apple-itunes-app` em `index.html` com o ID do app.
- [ ] **Gerenciador de senhas:** quando o app tiver Team ID (Apple) e certificado de assinatura (Android), adicionar `/.well-known/apple-app-site-association` e `/.well-known/assetlinks.json` (ver `docs/06-arquitetura.md`).
- [ ] **FAQ "O app é gratuito?":** ficou de fora até a decisão.
