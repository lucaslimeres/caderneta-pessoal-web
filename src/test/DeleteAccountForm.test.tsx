import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DeleteAccountForm } from '../components/DeleteAccountForm';

function jsonResponse(status: number, body?: unknown) {
  return new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

async function fillForm(password = 'minha-senha-1') {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('E-mail'), 'maria@example.com');
  await user.type(screen.getByLabelText('Senha'), password);
  await user.click(screen.getByRole('checkbox'));
  await user.click(screen.getByRole('button', { name: 'Excluir minha conta definitivamente' }));
}

afterEach(() => vi.unstubAllGlobals());

describe('DeleteAccountForm', () => {
  it('valida os campos antes de chamar a API', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    render(<DeleteAccountForm />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Excluir minha conta definitivamente' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Informe um e-mail válido.');
    expect(screen.getByLabelText('E-mail')).toHaveFocus();

    await user.type(screen.getByLabelText('E-mail'), 'maria@example.com');
    await user.type(screen.getByLabelText('Senha'), 'minha-senha-1');
    await user.click(screen.getByRole('button', { name: 'Excluir minha conta definitivamente' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Marque a confirmação para continuar.');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('entra com e-mail e senha e exclui a conta', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(200, { accessToken: 'token-123' }))
      .mockResolvedValueOnce(jsonResponse(204));
    vi.stubGlobal('fetch', fetchMock);
    render(<DeleteAccountForm />);

    await fillForm();

    expect(await screen.findByRole('status')).toHaveTextContent('Sua conta foi excluída.');
    const [loginUrl, loginInit] = fetchMock.mock.calls[0]!;
    expect(loginUrl).toBe('https://api.cadernetapessoal.com.br/v1/auth/login');
    expect(JSON.parse(loginInit.body)).toMatchObject({ email: 'maria@example.com', password: 'minha-senha-1' });
    const [deleteUrl, deleteInit] = fetchMock.mock.calls[1]!;
    expect(deleteUrl).toBe('https://api.cadernetapessoal.com.br/v1/me');
    expect(deleteInit).toMatchObject({
      method: 'DELETE',
      headers: expect.objectContaining({ authorization: 'Bearer token-123' }),
    });
  });

  it('mostra "E-mail ou senha incorretos" e foca a senha', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          jsonResponse(401, { error: { code: 'INVALID_CREDENTIALS', message: 'E-mail ou senha incorretos.' } }),
        ),
    );
    render(<DeleteAccountForm />);

    await fillForm('errada-123');

    expect(await screen.findByRole('alert')).toHaveTextContent('E-mail ou senha incorretos.');
    expect(screen.getByLabelText('Senha')).toHaveFocus();
    expect(screen.getByLabelText('Senha')).toHaveAttribute('aria-invalid', 'true');
  });

  it('mostra mensagem amigável quando a rede falha', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    render(<DeleteAccountForm />);

    await fillForm();

    expect(await screen.findByRole('alert')).toHaveTextContent('Verifique sua conexão');
  });
});
