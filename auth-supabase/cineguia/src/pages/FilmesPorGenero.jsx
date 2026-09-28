import { Link, useParams } from "react-router";
import CartaoFilme from "../components/CartaoFilme";
import { filmes } from "../data/filmes";

export default function FilmesPorGenero() {
  const { genero } = useParams();
  const generoDecodificado = decodeURIComponent(genero);

  const filmesFiltrados = filmes.filter(
    (filme) => filme.genero.toLowerCase() === generoDecodificado.toLowerCase()
  );

  return (
    <main>
      <h1>Gênero: {generoDecodificado}</h1>

      {filmesFiltrados.length === 0 ? (
        <div>
          <p>Não há filmes cadastrados para o gênero "{generoDecodificado}".</p>
          <Link to="/filmes">Voltar para a lista completa</Link>
        </div>
      ) : (
        <>
          <p>
            Exibindo {filmesFiltrados.length} filme(s) do gênero{" "}
            <strong>{generoDecodificado}</strong>:
          </p>
          <section className="lista-filmes" aria-label={`Filmes do gênero ${generoDecodificado}`}>
            {filmesFiltrados.map((filme) => (
              <CartaoFilme key={filme.id} filme={filme} />
            ))}
          </section>
          <p style={{ marginTop: "1.5rem" }}>
            <Link to="/filmes">Ver todos os filmes</Link>
          </p>
        </>
      )}
    </main>
  );
}