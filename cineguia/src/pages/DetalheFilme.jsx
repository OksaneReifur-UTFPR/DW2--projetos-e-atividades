import { Link, useNavigate, useParams } from "react-router";
import { filmes } from "../data/filmes";

export default function DetalheFilme() {
  const { id } = useParams();
  const navegar = useNavigate();
  const filme = filmes.find((item) => item.id === id);

  if (!filme) {
    return (
      <main>
        <h1>Filme não encontrado</h1>
        <p>Não existe um filme com o identificador “{id}” no catálogo.</p>
        <Link to="/filmes">Voltar para filmes</Link>
      </main>
    );
  }

  return (
    <main className="detalhe-filme">
      <button type="button" onClick={() => navegar(-1)}>
        Voltar
      </button>

      <p className="capa" aria-hidden="true">
        {filme.capa}
      </p>
      <p>
        Gênero:{" "}
        <Link to={`/generos/${encodeURIComponent(filme.genero)}`} className="tag-genero">
          {filme.genero}
        </Link>
      </p>
      <h1>{filme.titulo}</h1>
      <p>{filme.ano}</p>
      <p>{filme.sinopse}</p>

      <p style={{ marginTop: "1.5rem" }}>
        <Link to="/filmes">Ver todos os filmes</Link>
      </p>
    </main>
  );
}