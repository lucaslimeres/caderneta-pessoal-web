import type { ComponentType } from 'react';
import { Link } from 'react-router';
import { Faq } from '../components/Faq';
import { CalendarIcon, EyeIcon, HeartIcon, LockIcon, SproutIcon, WavesIcon } from '../components/icons';
import { StoreBadges } from '../components/StoreBadges';
import { usePageMeta } from '../seo';
import { PAGES } from './meta';

const STEPS: { title: string; text: string; icon: ComponentType; highlight?: boolean }[] = [
  { title: 'Qual foi o fato?', text: 'Descreva o que aconteceu.', icon: EyeIcon },
  { title: 'Quando ocorreu?', text: 'Registre a data.', icon: CalendarIcon },
  { title: 'Qual foi a sua reação?', text: 'Observe como você agiu.', icon: WavesIcon },
  { title: 'Qual o sentimento?', text: 'Reconheça o que sentiu depois.', icon: HeartIcon },
  { title: 'Proposta de mudança', text: 'Defina o que fazer diferente.', icon: SproutIcon, highlight: true },
];

const BENEFITS = [
  { title: 'Sempre à mão', text: 'Registre na hora, sem depender do papel.' },
  { title: 'Guiado', text: 'O modelo de 5 perguntas garante registros completos.' },
  { title: 'Fácil de reler', text: 'Encontre notas antigas com a busca.' },
  { title: 'Privado', text: 'Só você tem acesso às suas notas.' },
];

const SCREENS = [
  { src: '/assets/img/telas/minhas-notas.webp', alt: 'Lista de notas, agrupadas por mês, com a busca no topo.' },
  { src: '/assets/img/telas/nova-nota-reacao.webp', alt: 'Nova nota, pergunta 3 de 5: Qual foi a sua reação?' },
  { src: '/assets/img/telas/revisao.webp', alt: 'Revisão da nota com as cinco respostas antes de salvar.' },
];

export function HomePage() {
  usePageMeta(PAGES.home);

  return (
    <main id="conteudo">
      <div className="wrap">
        <section className="hero" aria-labelledby="titulo">
          <div className="hero-text">
            <h1 id="titulo">Sua Caderneta Pessoal, sempre com você.</h1>
            <p className="lead">
              Registre os fatos do dia, reflita sobre suas reações e sentimentos e anote suas propostas de mudança. O
              exercício da reforma íntima da Escola de Aprendizes do Evangelho, agora no seu celular.
            </p>
            <StoreBadges />
          </div>
          <div className="hero-art">
            <img
              src="/assets/img/telas/minhas-notas.webp"
              width={321}
              height={680}
              alt="Tela Minhas notas do app, com notas agrupadas por mês e o botão Nova nota."
              fetchPriority="high"
            />
          </div>
        </section>

        <section className="section split" aria-labelledby="o-que-e">
          <div className="section-head">
            <p className="eyebrow">O que é</p>
            <h2 className="section-title" id="o-que-e">
              O que é a Caderneta Pessoal
            </h2>
          </div>
          <p>
            A Caderneta Pessoal é o instrumento de auto-observação usado pelos alunos da Escola de Aprendizes do
            Evangelho para acompanhar a própria reforma íntima. O app mantém o mesmo método, em formato digital.
          </p>
        </section>

        <section className="section" id="como-funciona" aria-labelledby="como-funciona-titulo">
          <div className="section-head">
            <p className="eyebrow">Como funciona</p>
            <h2 className="section-title" id="como-funciona-titulo">
              Cinco perguntas em cada nota
            </h2>
          </div>
          <ol className="steps">
            {STEPS.map(({ title, text, icon: Icon, highlight }, index) => (
              <li key={title} className={highlight ? 'step step--destaque' : 'step'}>
                <div className="step-top">
                  <span className="step-icon">
                    <Icon />
                  </span>
                  <span className="step-number" aria-hidden="true">
                    {index + 1}
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section" aria-label="Benefícios">
          <div className="benefits">
            {BENEFITS.map(({ title, text }) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="privacy-band" id="privacidade" aria-label="Privacidade">
        <div className="wrap">
          <span className="privacy-icon">
            <LockIcon size={32} />
          </span>
          <div className="content">
            <p>
              Suas notas são suas. Não vendemos dados, não exibimos anúncios e ninguém além de você tem acesso ao que
              você escreve.
            </p>
            <Link to="/privacidade">Política de Privacidade</Link>
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="section section--sem-borda" aria-labelledby="telas">
          <div className="section-head">
            <p className="eyebrow">Telas do app</p>
            <h2 className="section-title" id="telas">
              Simples como uma caderneta
            </h2>
          </div>
          <div className="screens">
            {SCREENS.map((screen) => (
              <img key={screen.src} src={screen.src} alt={screen.alt} width={255} height={540} loading="lazy" />
            ))}
          </div>
        </section>

        <section className="section split" aria-labelledby="faq">
          <div className="section-head">
            <p className="eyebrow">Dúvidas</p>
            <h2 className="section-title" id="faq">
              Perguntas frequentes
            </h2>
          </div>
          <Faq />
        </section>

        <section className="cta" id="baixar" aria-labelledby="baixar-titulo">
          <h2 id="baixar-titulo">Comece hoje a sua caderneta.</h2>
          <StoreBadges />
        </section>
      </div>
    </main>
  );
}
