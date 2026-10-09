import type { ReactNode } from 'react';
import { Link } from 'react-router';

const QUESTIONS: { question: string; answer: ReactNode }[] = [
  {
    question: 'Preciso ser aluno da EAE para usar?',
    answer: 'Não. O app segue o modelo da Caderneta Pessoal da EAE, mas qualquer pessoa pode usar.',
  },
  {
    question: 'Alguém da casa espírita ou o dirigente pode ver minhas notas?',
    answer: 'Não. Só você tem acesso às suas notas.',
  },
  { question: 'Posso usar em mais de um celular?', answer: 'Sim, entrando com o mesmo e-mail.' },
  {
    question: 'Como excluo minha conta?',
    answer: (
      <>
        No app, em Perfil → Excluir conta, ou pela página{' '}
        <Link to="/excluir-conta">cadernetapessoal.com.br/excluir-conta</Link>.
      </>
    ),
  },
  {
    question: 'O app é oficial de alguma instituição?',
    answer:
      'Não. O Caderneta Pessoal é um aplicativo independente, criado para apoiar os alunos da Escola de Aprendizes do Evangelho. Não possui vínculo oficial com instituições espíritas.',
  },
  {
    question: 'Esqueci minha senha, e agora?',
    answer: 'No app, toque em "Esqueci minha senha" na tela de login e siga as instruções enviadas por e-mail.',
  },
];

export function Faq() {
  return (
    <dl className="faq">
      {QUESTIONS.map(({ question, answer }) => (
        <div key={question}>
          <dt>{question}</dt>
          <dd>{answer}</dd>
        </div>
      ))}
    </dl>
  );
}
