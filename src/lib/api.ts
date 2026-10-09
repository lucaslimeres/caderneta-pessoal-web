import { API_URL } from '../config';

/** Erro retornado pela API (mesmo formato em todas as rotas). A mensagem já vem em português. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string;
}

/** Cliente HTTP mínimo da API do Caderneta Pessoal. */
export async function api<T>(path: string, { method = 'GET', body, token }: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = { accept: 'application/json' };
  if (body !== undefined) headers['content-type'] = 'application/json';
  if (token) headers.authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, 'NETWORK_ERROR', 'Não foi possível concluir agora. Verifique sua conexão e tente novamente.');
  }

  if (response.status === 204) return undefined as T;
  const data = (await response.json().catch(() => null)) as
    (T & { error?: { code?: string; message?: string } }) | null;
  if (!response.ok) {
    throw new ApiError(
      response.status,
      data?.error?.code ?? 'INTERNAL_ERROR',
      data?.error?.message ?? 'Algo deu errado. Tente novamente em instantes.',
    );
  }
  return data as T;
}

/** Exclusão de conta pelo site: entra com e-mail e senha e chama DELETE /me. */
export async function deleteAccount(email: string, password: string): Promise<void> {
  const session = await api<{ accessToken: string }>('/auth/login', {
    method: 'POST',
    body: { email, password, deviceName: 'Site: excluir conta' },
  });
  await api<void>('/me', { method: 'DELETE', body: { password }, token: session.accessToken });
}
