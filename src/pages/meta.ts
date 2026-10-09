import type { PageMeta } from '../seo';

/** Metadados de cada página. A pré-renderização gera um HTML por entrada. */
export const PAGES = {
  home: {
    path: '/',
    title: 'Caderneta Pessoal: sua caderneta da EAE no celular',
    description:
      'Registre os fatos do dia, reflita sobre suas reações e sentimentos e anote suas propostas de mudança. A Caderneta Pessoal da Escola de Aprendizes do Evangelho, agora no seu celular.',
  },
  privacidade: {
    path: '/privacidade',
    title: 'Política de Privacidade · Caderneta Pessoal',
    description: 'Como o app Caderneta Pessoal coleta, usa, armazena e protege seus dados pessoais, conforme a LGPD.',
  },
  excluirConta: {
    path: '/excluir-conta',
    title: 'Excluir conta · Caderneta Pessoal',
    description: 'Como excluir sua conta do app Caderneta Pessoal e todos os seus dados, pelo app ou por esta página.',
    noindex: true,
  },
  suporte: {
    path: '/suporte',
    title: 'Suporte · Caderneta Pessoal',
    description: 'Fale com a equipe do Caderneta Pessoal e veja as perguntas frequentes.',
  },
  naoEncontrada: {
    path: '/404',
    title: 'Página não encontrada · Caderneta Pessoal',
    description: 'Esta página não existe ou mudou de endereço.',
    noindex: true,
  },
} satisfies Record<string, PageMeta>;
