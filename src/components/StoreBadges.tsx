import { STORE_LINKS } from '../config';

/**
 * Botões das lojas. Provisórios: troque pelos selos oficiais da Apple e do Google
 * e preencha STORE_LINKS em src/config.ts quando o app for publicado.
 */
export function StoreBadges() {
  return (
    <div className="stores">
      <a className="store-badge" href={STORE_LINKS.appStore || '#baixar'} aria-label="Baixar na App Store">
        <small>Baixar na</small>
        <strong>App Store</strong>
      </a>
      <a className="store-badge" href={STORE_LINKS.googlePlay || '#baixar'} aria-label="Disponível no Google Play">
        <small>Disponível no</small>
        <strong>Google Play</strong>
      </a>
    </div>
  );
}
