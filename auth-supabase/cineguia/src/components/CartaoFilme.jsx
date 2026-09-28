import { Link } from "react-router";

export default function CartaoFilme({ filme }) {
  return (
    <article className="cartao-filme">
      <p className="capa" aria-hidden="true">
        {filme.capa}
      </p>
      <h2>{filme.titulo}</h2>
      <p>
        {filme.ano} ·{" "}
        <Link to={`/generos/${encodeURIComponent(filme.genero)}`} className="tag-genero">
          {filme.genero}
        </Link>
      </p>
      <p style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
        <Link to={`/filmes/${filme.id}`}>Ver detalhes</Link>
      </p>
    </article>
  );
}