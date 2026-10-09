import { Link } from 'react-router';

/** Símbolo + nome, com link para a página inicial. */
export function Brand({ size = 40 }: { size?: number }) {
  return (
    <Link className="brand" to="/" aria-label="Caderneta Pessoal, página inicial">
      <img src="/assets/img/simbolo.svg" alt="" width={size} height={size} />
      <span>Caderneta Pessoal</span>
    </Link>
  );
}
