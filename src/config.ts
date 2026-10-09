export const SITE_URL = 'https://cadernetapessoal.com.br';

/** URL da API. Em desenvolvimento, defina VITE_API_URL em .env.local (ex.: http://localhost:3333/v1). */
export const API_URL: string = import.meta.env.VITE_API_URL ?? 'https://api.cadernetapessoal.com.br/v1';

export const CONTACT_EMAIL = 'contato@cadernetapessoal.com.br';
export const PRIVACY_EMAIL = 'privacidade@cadernetapessoal.com.br';

/**
 * Links das lojas. Preencha quando o app for publicado (e troque os botões pelos selos oficiais).
 * Enquanto estiverem vazios, os botões levam à seção "Baixar" da página inicial.
 */
export const STORE_LINKS = {
  appStore: '',
  googlePlay: '',
};
