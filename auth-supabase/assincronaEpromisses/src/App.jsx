// src/App.jsx
import { useState } from "react";
import "./App.css";

// ============================================================================
// SIMULADOR DE API
// ============================================================================
function fakeApi(dados, tempoMs = 2000, deveFalhar = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (deveFalhar) {
        reject(new Error("Falha Crítica 500: O servidor de banco de dados caiu."));
      } else {
        resolve(dados);
      }
    }, tempoMs);
  });
}

// ============================================================================
// EXERCÍCIO 1: O Await Básico (Sem Tratamento de Erros)
// ============================================================================
function Exercicio1() {
  const [mensagem, setMensagem] = useState("Status: Aguardando clique...");

  // Adicionado 'async' para permitir o uso de pausas com await
  async function baixarDadosBasicos() {
    setMensagem("🔄 Conectando ao servidor...");

    // Espera a Promise da fakeApi ser resolvida e extrai o valor de dentro dela
    const resposta = await fakeApi("✅ Download concluído com sucesso!", 2000);

    // Atualiza o estado com o texto retornado
    setMensagem(resposta);
  }

  return (
    <section className="exercise-panel">
      <h2>1. O Await Básico</h2>
      <p>Entendendo o fluxo de espera do JavaScript no navegador.</p>

      <div className="status-box">{mensagem}</div>

      <button className="btn" onClick={baixarDadosBasicos}>
        Iniciar Download (2s)
      </button>
    </section>
  );
}

// ============================================================================
// EXERCÍCIO 2: O Cinto de Segurança (Try / Catch / Finally)
// ============================================================================
function Exercicio2() {
  const [status, setStatus] = useState("Pronto para testar falhas.");
  const [isProcessando, setIsProcessando] = useState(false);

  // Adicionado 'async' à função
  async function realizarTransacaoBancaria() {
    setIsProcessando(true);
    setStatus("🔄 Processando pagamento na operadora...");

    // Bloco estruturado com tratamento total de falhas na rede simulada
    try {
      // A API está configurada para dar reject (falhar) propositalmente após 3s
      const resultado = await fakeApi("Transação Aprovada", 3000, true);
      setStatus(resultado);

    } catch (erro) {
      // Captura o erro disparado pela falha da Promise
      setStatus("❌ ERRO: " + erro.message);

    } finally {
      // Desativa o estado de carregamento independentemente do sucesso ou da falha
      setIsProcessando(false);
    }
  }

  return (
    <section className="exercise-panel">
      <h2>2. Resiliência: Try/Catch/Finally</h2>
      <p>A internet é imprevisível. Este botão simula uma queda de servidor no meio de uma compra.</p>

      <div className="status-box">{status}</div>

      <button
        className="btn btn-danger"
        onClick={realizarTransacaoBancaria}
        disabled={isProcessando}
      >
        {isProcessando ? "Aguarde..." : "Aprovar Compra Arriscada"}
      </button>
    </section>
  );
}

// ============================================================================
// EXERCÍCIO 3: Unindo a Tríade de Estados do React
// ============================================================================
function Exercicio3() {
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState(null);

  // Transformada em função assíncrona
  async function carregarCatalogo() {
    // Passo 1: Preparação da interface gráfica
    setLoading(true); 
    setErro(null);    
    setProdutos([]);  

    try {
      // Faz o await buscando a lista fictícia de produtos com delay de 2500ms
      const resultado = await fakeApi([
        { id: 1, nome: "Teclado" },
        { id: 2, nome: "Mouse" },
        { id: 3, nome: "Monitor" }
      ], 2500);
      
      setProdutos(resultado);

    } catch (error) {
      setErro(error.message);

    } finally {
      // Remove o sinalizador visual de carregamento
      setLoading(false);
    }
  }

  return (
    <section className="exercise-panel">
      <h2>3. Interface Completa com a Tríade de Estados</h2>
      <p>Controlando o visual (UI) baseado nos eventos do tempo.</p>

      <button className="btn btn-success" onClick={carregarCatalogo} disabled={loading}>
        {loading ? "Buscando dados..." : "Carregar Catálogo da Loja"}
      </button>

      {/* 1. Estado de Carregamento */}
      {loading && (
        <div style={{ marginTop: '20px', color: 'var(--accent)' }}>
          🔄 Conectando com a base de dados... Por favor, aguarde.
        </div>
      )}

      {/* 2. Estado de Erro */}
      {erro && (
        <div style={{ marginTop: '20px', color: 'var(--danger)', fontWeight: 'bold' }}>
          ❌ Ocorreu um problema: {erro}
        </div>
      )}

      {/* 3. Estado de Sucesso com Dados */}
      {!loading && !erro && produtos.length > 0 && (
        <div className="grid">
          {produtos.map(p => (
            <div className="card" key={p.id}>
              <strong>ID: {p.id}</strong><br/>
              {p.nome}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ============================================================================
// EXERCÍCIO 4: Desafio Avançado - Consumo Paralelo (Promise.all)
// ============================================================================
function Exercicio4() {
  const [loading, setLoading] = useState(false);
  const [dadosPainel, setDadosPainel] = useState(null);
  const [erro, setErro] = useState(null);

  async function carregarPainelParalelo() {
    setLoading(true);
    setErro(null);
    setDadosPainel(null);

    try {
      // Disparamos as execuções ao mesmo tempo (sem usar 'await' na linha da chamada)
      const promessaUsuario = fakeApi("Usuário: Carlos", 2000);
      const promessaNivel = fakeApi("Nível: Administrador", 3000);

      // Usamos Promise.all para esperar ambas terminarem em paralelo.
      // O tempo de resposta final será o da mais lenta (3s) e não a soma delas (5s)
      const [usuario, nivel] = await Promise.all([promessaUsuario, promessaNivel]);

      setDadosPainel({ usuario, nivel });

    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="exercise-panel">
      <h2>4. Desafio Avançado: Corrida de Promises</h2>
      <p>Disparando múltiplas requisições ao mesmo tempo com <code>Promise.all()</code>.</p>

      <button className="btn" onClick={carregarPainelParalelo} disabled={loading}>
        {loading ? "Carregando em Paralelo..." : "Carregar Dados do Painel (Max 3s)"}
      </button>

      {loading && (
        <div style={{ marginTop: '20px', color: 'var(--accent)' }}>
          🔄 Buscando informações em paralelo...
        </div>
      )}

      {erro && (
        <div style={{ marginTop: '20px', color: 'var(--danger)', fontWeight: 'bold' }}>
          ❌ Erro ao carregar painel: {erro}
        </div>
      )}

      {!loading && !erro && dadosPainel && (
        <div className="grid">
          <div className="card" style={{ borderLeftColor: 'var(--success)' }}>
            <strong>Perfil do Sistema</strong><br/>
            {dadosPainel.usuario}
          </div>
          <div className="card" style={{ borderLeftColor: 'var(--success)' }}>
            <strong>Permissões</strong><br/>
            {dadosPainel.nivel}
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL APP
// ============================================================================
export default function App() {
  return (
    <div className="container">
      <h1 className="title">O Tempo e o React ⏱️</h1>
      <Exercicio1 />
      <Exercicio2 />
      <Exercicio3 />
      <Exercicio4 />
    </div>
  );
}