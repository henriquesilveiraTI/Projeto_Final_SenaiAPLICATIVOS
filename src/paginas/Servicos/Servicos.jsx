import { useState, useEffect } from "react";
import "./Servicos.css";

function Servicos() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [data, setData] = useState("");
  const [companhia, setCompanhia] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const [passagens, setPassagens] = useState([]);
  const [carteiraIds, setCarteiraIds] = useState(new Set());
  const [erro, setErro] = useState("");
  const [vooSalvoId, setVooSalvoId] = useState(null);
  const [modalSalvo, setModalSalvo] = useState(false);

  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuarioLogado"))
  );

  const capitais = [
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Brasília",
    "Salvador",
    "Fortaleza",
    "Recife",
    "Curitiba",
    "Porto Alegre",
    "Florianópolis",
    "Manaus",
    "Belém",
    "Goiânia",
    "Campo Grande",
    "Cuiabá",
    "Natal",
    "João Pessoa",
    "Maceió",
    "Aracaju",
    "Teresina",
    "São Luís",
    "Palmas",
    "Boa Vista",
    "Macapá",
    "Rio Branco",
    "Porto Velho",
    "Vitória",
  ];

  useEffect(() => {
    const atualizarUsuario = () => {
      setUsuario(
        JSON.parse(localStorage.getItem("usuarioLogado"))
      );
    };

    window.addEventListener("authChange", atualizarUsuario);

    return () => {
      window.removeEventListener(
        "authChange",
        atualizarUsuario
      );
    };
  }, []);

  useEffect(() => {
    if (!usuario) {
      setCarteiraIds(new Set());
      return;
    }

    const chave = `carteira_${usuario.email}`;

    const carteira =
      JSON.parse(localStorage.getItem(chave)) || [];

    setCarteiraIds(
      new Set(carteira.map((p) => p.id))
    );
  }, [usuario]);

  const formatarData = (data) => {
    if (!data) return "";

    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  };

  const gerarVoosFake = (quantidade = 100) => {
    const companhias = [
      "LATAM",
      "Gol",
      "Azul",
      "VOEPASS",
      "Avianca",
    ];

    const voos = [];

    for (let i = 0; i < quantidade; i++) {
      let origem =
        capitais[Math.floor(Math.random() * capitais.length)];

      let destino =
        capitais[Math.floor(Math.random() * capitais.length)];

      while (origem === destino) {
        destino =
          capitais[Math.floor(Math.random() * capitais.length)];
      }

      const data = new Date();

      data.setDate(
        data.getDate() +
          Math.floor(Math.random() * 60)
      );

      voos.push({
        id: crypto.randomUUID(),
        origem,
        destino,
        data: data.toISOString().split("T")[0],
        companhia:
          companhias[
            Math.floor(
              Math.random() * companhias.length
            )
          ],
      });
    }

    return voos;
  };

  const buscarVoos = () => {
    setErro("");
    setPassagens(gerarVoosFake(100));
  };

const salvarNaCarteira = (voo) => {
  setErro("");

  if (!usuario) {
    setErro("Faça login para salvar passagens.");
    return;
  }

  const chave = `carteira_${usuario.email}`;

  const carteiraAtual =
    JSON.parse(localStorage.getItem(chave)) || [];

  if (
    carteiraAtual.some((p) => p.id === voo.id)
  ) {
    return;
  }

  const novaCarteira = [...carteiraAtual, voo];

  localStorage.setItem(
    chave,
    JSON.stringify(novaCarteira)
  );

  setCarteiraIds(
    new Set(novaCarteira.map((p) => p.id))
  );

  setVooSalvoId(voo.id);

  setTimeout(() => {
    setPassagens((prev) =>
      prev.filter((p) => p.id !== voo.id)
    );
  }, 1500);

  setTimeout(() => {
    setVooSalvoId(null);
  }, 1500);
};
  const fecharModal = () => {
    setErro("");
    setOrigem("");
    setDestino("");
    setData("");
    setCompanhia("");
    setMostrarModal(false);
  };

  const salvarPassagem = () => {
  setErro("");

  if (!usuario) {
    setErro("Faça login para adicionar voos.");
    return;
  }

  if (
    !origem ||
    !destino ||
    !data ||
    !companhia
  ) {
    setErro("Preencha todos os campos.");
    return;
  }

  const nova = {
    id: crypto.randomUUID(),
    origem,
    destino,
    data,
    companhia,
  };

  setPassagens((prev) => [...prev, nova]);

  salvarNaCarteira(nova);

  setModalSalvo(true);

  setTimeout(() => {
    setModalSalvo(false);
    fecharModal();
  }, 1000);
};


  return (
    <section className="servicos-container">
      <div className="servicos-conteudo">
        <h1>Busque suas Passagens</h1>

        <div className="acoes">
          <button onClick={buscarVoos}>
            Buscar Voos
          </button>

          <button
            onClick={() => {
              setErro("");
              setMostrarModal(true);
            }}
          >
            Adicionar Voo
          </button>
        </div>

        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Adicionar Voo</h2>

              <input
                type="text"
                placeholder="Origem"
                value={origem}
                onChange={(e) =>
                  setOrigem(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Destino"
                value={destino}
                onChange={(e) =>
                  setDestino(e.target.value)
                }
              />

              <input
                type="date"
                value={data}
                onChange={(e) =>
                  setData(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Companhia"
                value={companhia}
                onChange={(e) =>
                  setCompanhia(e.target.value)
                }
              />

              {erro && (
                <div className="servicos-erro">
                  {erro}
                </div>
              )}

{modalSalvo && (
  <div className="modal-sucesso">
    ✓ Salvo na carteira
  </div>
)}
              <div className="modal-botoes">
                <button onClick={salvarPassagem}>
                  Salvar na Carteira
                </button>

                <button onClick={fecharModal}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {!mostrarModal && erro && (
          <div className="servicos-erro servicos-erro-pagina">
            {erro}
          </div>
        )}

        <div className="resultados">
{passagens.length === 0 ? (
              <p className="sem-resultados">
              Nenhuma passagem encontrada.
            </p>
          ) : (
            passagens.map((voo) => (
              <div
                key={voo.id}
                className="card-voo"
              >
                <h2>
                  {voo.origem} → {voo.destino}
                </h2>

                <p>
                  Companhia: {voo.companhia}
                </p>

                <p>
                  Data: {formatarData(voo.data)}
                </p>

                <button
  disabled={vooSalvoId === voo.id}
  onClick={() => salvarNaCarteira(voo)}
>
  {vooSalvoId === voo.id
    ? "✓ Salvo na Carteira"
    : "Salvar na Carteira"}
</button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Servicos;