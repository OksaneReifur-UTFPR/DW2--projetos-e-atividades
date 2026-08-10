import { Route, Routes } from "react-router";
import Cabecalho from "./components/Cabecalho";
import Inicio from "./pages/Inicio";
import ListaFilmes from "./pages/ListaFilmes";
import DetalheFilme from "./pages/DetalheFilme";
import Favoritos from "./pages/Favoritos";
import FilmesPorGenero from "./pages/FilmesPorGenero";
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada";

export default function App() {
  return (
    <>
      <Cabecalho />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/filmes" element={<ListaFilmes />} />
        <Route path="/filmes/:id" element={<DetalheFilme />} />
        <Route path="/generos/:genero" element={<FilmesPorGenero />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="*" element={<PaginaNaoEncontrada />} />
      </Routes>
    </>
  );
}