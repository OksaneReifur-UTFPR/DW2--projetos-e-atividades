import { Link } from "react-router";

export default function PaginaNaoEncontrada() {
  return (
    <main>
      <h1>Página não encontrada</h1>
      <p>O endereço informado não faz parte do CineGuia.</p>
      <Link to="/">Ir para o início</Link>
    </main>
  );
}