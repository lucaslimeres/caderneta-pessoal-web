import { describe, expect, it } from 'vitest';
import { render } from '../entry-server';

describe('pré-renderização', () => {
  it.each([
    ['/', 'Sua Caderneta Pessoal, sempre com você.'],
    ['/privacidade', 'Política de Privacidade'],
    ['/excluir-conta', 'Excluir sua conta'],
    ['/suporte', 'Suporte'],
    ['/404', 'Página não encontrada'],
  ])('%s gera o HTML com o conteúdo', (path, heading) => {
    const html = render(path);
    expect(html).toContain(heading);
    expect(html).toContain('Aplicativo independente, sem vínculo oficial com instituições espíritas.');
  });

  it('links internos usam as rotas em português', () => {
    const html = render('/');
    for (const href of ['/privacidade', '/excluir-conta', '/suporte']) expect(html).toContain(`href="${href}"`);
  });
});
