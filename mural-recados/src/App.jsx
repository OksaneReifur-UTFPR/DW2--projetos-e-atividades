import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import "./App.css";

export default function App() {
  const [recados, setRecados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarRecados() {
      try {
        // Exercício 2: Para inverter a ordem para os mais antigos no topo,
        // mude ascending para true: .order("data_criacao", { ascending: true })
        // Exercício 3: Para testar a falha, altere "recados" para "tabela-que-nao-existe"
        const { data, error } = await supabase
          .from("recados")
          .select("*")
          .order("data_criacao", { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        setRecados(data);
      } catch (e) {
        setErro("Não foi possível conectar ao banco de dados.");
        console.error(e);
      } finally {
        setCarregando(false);
      }
    }

    buscarRecados();
  }, []);

  return (
    <main className="container">
      <h1>Mural de Recados</h1>

      {/* Exercício 1: Contador dinâmico de mensagens */}
      {!carregando && !erro && (
        <p className="contador">
          {recados.length === 0
            ? "Nenhuma mensagem cadastrada"
            : `Mostrando ${recados.length} ${
                recados.length === 1 ? "recado cadastrado" : "recados cadastrados"
              }`}
        </p>
      )}

      {carregando && <p>Buscando mensagens no Supabase...</p>}
      {erro && <p className="erro">{erro}</p>}

      {!carregando && !erro && recados.length === 0 && (
        <p>O mural está vazio no momento. Seja o primeiro a postar!</p>
      )}

      {!carregando && !erro && recados.length > 0 && (
        <ul className="lista-recados">
          {recados.map((recado) => (
            <li key={recado.id} className="cartao-recado">
              <strong>{recado.autor} diz:</strong>
              <p>{recado.mensagem}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}