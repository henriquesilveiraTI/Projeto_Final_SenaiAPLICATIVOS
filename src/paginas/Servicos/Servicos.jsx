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

  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  const formatarData = (data) => {
    if (!data) return "";

    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const capitais = [
    "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Salvador",
    "Fortaleza", "Recife", "Curitiba", "Porto Alegre", "Florianópolis",
    "Manaus", "Belém", "Goiânia", "Campo Grande", "Cuiabá",
    "Natal", "João Pessoa", "Maceió", "Aracaju", "Teresina",
    "São Luís", "Palmas", "Boa Vista", "Macapá", "Rio Branco",
    "Porto Velho", "Vitória"
  ];

  useEffect(() => {
    if (!usuario) return;

    const chave = `carteira_${usuario.email}`;
    const carteira = JSON.parse(localStorage.getItem(chave)) || [];

    setCarteiraIds(new Set(carteira.map((p) => p.id)));
  }, []);

  const gerarVoosFake = (quantidade = 100) => {
    const companhias = ["LATAM", "Gol", "Azul", "VOEPASS", "Avianca"];
    const voos = [];

    for (let i = 0; i < quantidade; i++) {
      let origem = capitais[Math.floor(Math.random() * capitais.length)];
      let destino = capitais[Math.floor(Math.random() * capitais.length)];

      while (destino === origem) {
        destino = capitais[Math.floor(Math.random() * capitais.length)];
      }

      const data = new Date();
      data.setDate(data.getDate() + Math.floor(Math.random() * 60));

      voos.push({
        id: Date.now() + i + Math.random(),
        origem,
        destino,
        data: data.toISOString().split("T")[0], // mantém padrão
        companhia: companhias[Math.floor(Math.random() * companhias.length)]
      });
    }

    return voos;
  };

  const buscarVoos = () => {
    const voosFake = gerarVoosFake(100);
    setPassagens(voosFake);
  };

  const salvarNaCarteira = (voo) => {
    if (!usuario) {
      alert("Faça login primeiro!");
      return;
    }

    const chave = `carteira_${usuario.email}`;
    const carteiraAtual = JSON.parse(localStorage.getItem(chave)) || [];

    if (carteiraAtual.some((p) => p.id === voo.id)) return;

    const novaCarteira = [...carteiraAtual, voo];

    localStorage.setItem(chave, JSON.stringify(novaCarteira));

    setCarteiraIds(new Set(novaCarteira.map((p) => p.id)));
  };

  const salvarPassagem = () => {
    if (!origem || !destino || !data || !companhia) {
      alert("Preencha todos os campos!");
      return;
    }

    const nova = {
      id: Date.now() + Math.random(),
      origem,
      destino,
      data,
      companhia,
    };

    setPassagens((prev) => [...prev, nova]);
    salvarNaCarteira(nova);

    setOrigem("");
    setDestino("");
    setData("");
    setCompanhia("");
    setMostrarModal(false);
  };

  const passagensFiltradas = passagens.filter(
    (voo) => !carteiraIds.has(voo.id)
  );

  return (
    <div className="servicos-container">
      <h1>Busque suas Passagens</h1>

      <div className="acoes">
        <button onClick={buscarVoos}>Buscar Voos</button>
        <button onClick={() => setMostrarModal(true)}>Adicionar Voo</button>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Adicionar Voo</h2>

            <input
              type="text"
              placeholder="Origem"
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
            />

            <input
              type="text"
              placeholder="Destino"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            />

            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />

            <input
              type="text"
              placeholder="Companhia"
              value={companhia}
              onChange={(e) => setCompanhia(e.target.value)}
            />

            <div className="modal-botoes">
              <button onClick={salvarPassagem}>Salvar</button>
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="resultados">
        {passagensFiltradas.length === 0 ? (
          <p>Busque voos para ver resultados</p>
        ) : (
          passagensFiltradas.map((voo) => (
            <div key={voo.id} className="card-voo">
              <h2>{voo.origem} → {voo.destino}</h2>
              <p>Companhia: {voo.companhia}</p>

              <p>{formatarData(voo.data)}</p>

              <button
                onClick={() => salvarNaCarteira(voo)}
                disabled={carteiraIds.has(voo.id)}
              >
                {carteiraIds.has(voo.id) ? "Salvo" : "Salvar"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Servicos;