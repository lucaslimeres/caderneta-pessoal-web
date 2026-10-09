import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigationType } from 'react-router';
import { CONTACT_EMAIL } from '../config';
import { Brand } from './Brand';

/**
 * Ao trocar de página, volta ao topo (sem a rolagem suave do CSS); com âncora (#secao), rola até ela.
 * Em "voltar/avançar" do navegador, mantém a posição que o navegador restaura.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  useEffect(() => {
    if (navigationType === 'POP') return;
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash, navigationType]);
  return null;
}

export function Layout() {
  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="wrap">
          <Brand />
          <nav className="site-nav" aria-label="Principal">
            <Link to="/#como-funciona">Como funciona</Link>
            <Link to="/#privacidade">Privacidade</Link>
            <Link to="/#baixar">Baixar</Link>
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-info">
            <Brand size={28} />
            <span>© 2026 UBEN Technology</span>
            <span>Aplicativo independente, sem vínculo oficial com instituições espíritas.</span>
          </div>
          <nav className="footer-links" aria-label="Rodapé">
            <Link to="/privacidade">Política de Privacidade</Link>
            <Link to="/excluir-conta">Excluir conta</Link>
            <Link to="/suporte">Suporte</Link>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
