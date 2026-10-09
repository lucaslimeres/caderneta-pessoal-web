import { Link } from 'react-router';
import { Faq } from '../components/Faq';
import { CONTACT_EMAIL } from '../config';
import { usePageMeta } from '../seo';
import { PAGES } from './meta';

export function SupportPage() {
  usePageMeta(PAGES.suporte);
  return (
    <main id="conteudo" className="wrap">
      <article className="doc">
        <h1>Suporte</h1>
        <p className="meta">Estamos aqui para ajudar.</p>

        <div className="callout">
          <p>
            Escreva para{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <strong>{CONTACT_EMAIL}</strong>
            </a>
            . Respondemos em até 2 dias úteis.
          </p>
        </div>
        <p>
          Para ajudar mais rápido, conte no e-mail o modelo do seu celular e o que aconteceu.{' '}
          <strong>Nunca envie sua senha</strong>: nossa equipe nunca vai pedi-la.
        </p>

        <h2 id="perguntas">Perguntas frequentes</h2>
        <Faq />

        <h2 id="links">Links úteis</h2>
        <ul>
          <li>
            <Link to="/privacidade">Política de Privacidade</Link>
          </li>
          <li>
            <Link to="/excluir-conta">Excluir sua conta</Link>
          </li>
        </ul>
      </article>
    </main>
  );
}
