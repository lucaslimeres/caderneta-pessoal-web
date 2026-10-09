import { Link } from 'react-router';
import { DeleteAccountForm } from '../components/DeleteAccountForm';
import { PRIVACY_EMAIL } from '../config';
import { usePageMeta } from '../seo';
import { PAGES } from './meta';

export function DeleteAccountPage() {
  usePageMeta(PAGES.excluirConta);
  return (
    <main id="conteudo" className="wrap">
      <article className="doc">
        <h1>Excluir sua conta</h1>
        <p className="meta">Caderneta Pessoal · desenvolvido por UBEN Technology</p>

        <p>
          Você pode excluir sua conta do <strong>Caderneta Pessoal</strong> a qualquer momento. A exclusão é{' '}
          <strong>definitiva</strong>: apaga seus dados de cadastro (nome, e-mail, telefone e senha) e{' '}
          <strong>todas as suas notas</strong>. Não é possível desfazer.
        </p>
        <p>Os dados são apagados na hora da base principal, e as cópias de segurança são removidas em até 30 dias.</p>

        <h2 id="pelo-app">Pelo app</h2>
        <ol>
          <li>Abra o Caderneta Pessoal e entre na sua conta.</li>
          <li>Toque no ícone de perfil, no canto superior direito.</li>
          <li>
            Toque em <strong>Excluir conta</strong>, no fim da tela.
          </li>
          <li>Digite sua senha para confirmar.</li>
        </ol>

        <h2 id="por-aqui">Por esta página</h2>
        <p>Se você não tem mais o app instalado, confirme seu e-mail e sua senha abaixo.</p>
        <DeleteAccountForm />

        <h2 id="sem-senha">Esqueceu a senha?</h2>
        <p>
          Abra o app e toque em <strong>Esqueci minha senha</strong> na tela de login. Depois de criar uma nova senha,
          volte a esta página ou exclua pelo app.
        </p>
        <p>
          Se você não tem mais acesso ao e-mail da conta, escreva para{' '}
          <a href={`mailto:${PRIVACY_EMAIL}?subject=Exclus%C3%A3o%20de%20conta`}>{PRIVACY_EMAIL}</a> pedindo a exclusão.
          Vamos confirmar que a conta é sua antes de excluir.
        </p>

        <p>
          Saiba mais na nossa <Link to="/privacidade">Política de Privacidade</Link>.
        </p>
      </article>
    </main>
  );
}
