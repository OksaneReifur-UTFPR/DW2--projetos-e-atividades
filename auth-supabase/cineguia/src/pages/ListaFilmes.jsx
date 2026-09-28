import CartaoFilme from "../components/CartaoFilme";
import { filmes } from "../data/filmes";

export default function ListaFilmes() {
  return (
    <main>
      <h1>Filmes</h1>
      <p>Escolha um filme para conhecer os detalhes.</p>

      <section className="lista-filmes" aria-label="Catálogo de filmes">
        {filmes.map((filme) => (
          <CartaoFilme key={filme.id} filme={filme} />
        ))}
      </section>
    </main>
  );
}