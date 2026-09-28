import { NavLink } from "react-router";

function classeDoLink({ isActive }) {
  return isActive ? "ativo" : "";
}

export default function Cabecalho() {
  return (
    <header className="cabecalho">
      <NavLink className="marca" to="/" end>
        CineGuia
      </NavLink>

      <nav aria-label="Navegação principal">
        <NavLink className={classeDoLink} to="/" end>
          Início
        </NavLink>
        <NavLink className={classeDoLink} to="/filmes">
          Filmes
        </NavLink>
        <NavLink className={classeDoLink} to="/favoritos">
          Favoritos
        </NavLink>
      </nav>
    </header>
  );
}