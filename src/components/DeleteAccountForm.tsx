import { useId, useRef, useState, type FormEvent } from 'react';
import { ApiError, deleteAccount } from '../lib/api';
import { AlertIcon, CheckCircleIcon } from './icons';

/** Mensagens próprias desta página para alguns códigos de erro da API. */
const MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: 'E-mail ou senha incorretos.',
  INVALID_PASSWORD: 'Senha incorreta.',
  ACCOUNT_LOCKED: 'Muitas tentativas. Aguarde alguns minutos ou redefina sua senha pelo app.',
  EMAIL_NOT_VERIFIED:
    'Esta conta ainda não foi confirmada. Cadastros não confirmados são apagados automaticamente em até 7 dias.',
  RATE_LIMITED: 'Muitas tentativas. Aguarde um pouco e tente novamente.',
};

const GENERIC_ERROR = 'Não foi possível concluir agora. Verifique sua conexão e tente novamente.';

type Field = 'email' | 'password' | 'confirm';

export function DeleteAccountForm({ onDeleted }: { onDeleted?: () => void }) {
  const id = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<{ message: string; field?: Field } | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  function fail(message: string, field?: Field) {
    setError({ message, field });
    const ref =
      field === 'email' ? emailRef : field === 'password' ? passwordRef : field === 'confirm' ? confirmRef : null;
    ref?.current?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed || emailRef.current?.validity.typeMismatch) return fail('Informe um e-mail válido.', 'email');
    if (!password) return fail('Informe sua senha.', 'password');
    if (!confirmed) return fail('Marque a confirmação para continuar.', 'confirm');

    setLoading(true);
    try {
      await deleteAccount(trimmed, password);
      setDeleted(true);
      onDeleted?.();
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      const message = err instanceof ApiError ? (MESSAGES[err.code] ?? err.message) : GENERIC_ERROR;
      fail(message, err instanceof ApiError && err.code === 'INVALID_CREDENTIALS' ? 'password' : undefined);
    } finally {
      setLoading(false);
    }
  }

  if (deleted) {
    return (
      <div className="alert alert--sucesso card" role="status" tabIndex={-1} ref={successRef}>
        <CheckCircleIcon size={20} />
        <span>
          <strong>Sua conta foi excluída.</strong> Enviamos uma confirmação para o seu e-mail. Obrigado por ter usado a
          Caderneta Pessoal.
        </span>
      </div>
    );
  }

  const invalid = (field: Field) => (error?.field === field ? true : undefined);

  return (
    <form className="card" onSubmit={handleSubmit} noValidate aria-describedby={error ? `${id}-erro` : undefined}>
      {error ? (
        <div className="alert alert--erro" role="alert" id={`${id}-erro`}>
          <AlertIcon size={20} />
          <span>{error.message}</span>
        </div>
      ) : null}
      <div className="field">
        <label htmlFor={`${id}-email`}>E-mail</label>
        <input
          ref={emailRef}
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="username"
          inputMode="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={invalid('email')}
        />
      </div>
      <div className="field">
        <label htmlFor={`${id}-senha`}>Senha</label>
        <input
          ref={passwordRef}
          id={`${id}-senha`}
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={invalid('password')}
        />
      </div>
      <label className="check">
        <input
          ref={confirmRef}
          type="checkbox"
          checked={confirmed}
          onChange={(event) => setConfirmed(event.target.checked)}
          aria-invalid={invalid('confirm')}
        />
        <span>Entendo que minha conta e todas as minhas notas serão excluídas definitivamente.</span>
      </label>
      <button className="button button--perigo" type="submit" disabled={loading}>
        {loading ? 'Excluindo…' : 'Excluir minha conta definitivamente'}
      </button>
    </form>
  );
}
