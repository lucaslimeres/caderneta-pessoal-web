import { Link } from 'react-router';
import { usePageMeta } from '../seo';
import { PAGES } from './meta';

export function NotFoundPage() {
  usePageMeta(PAGES.naoEncontrada);
  return (
    <main id="conteudo" className="wrap">
      <article className="doc">
        <h1>Página não encontrada</h1>
        <p>Esta página não existe ou mudou de endereço.</p>
        <p>
          <Link className="button" to="/">
            Voltar para o início
          </Link>
        </p>
      </article>
    </main>
  );
}
