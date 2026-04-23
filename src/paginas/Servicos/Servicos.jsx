import { useState } from "react";
import "./Servicos.css";

function Servicos() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [data, setData] = useState("");
  const [resultados, setResultados] = useState([]);

  const buscarPassagens = () => {
    // MOCK (depois dá pra ligar em API)
    const dadosFake = [
      {
        id: 1,
        origem: "São Paulo",
        destino: "Roma",
        preco: 3200,
        companhia: "LATAM",
      },
      {
        id: 2,
        origem: "Rio de Janeiro",
        destino: "Nova York",
        preco: 2800,
        companhia: "Gol",
      },
      {
        id: 3,
        origem: "Florianópolis",
        destino: "Kyoto",
        preco: 4500,
        companhia: "Azul",
      },
    ];

    const filtrados = dadosFake.filter(
      (voo) =>
        voo.origem.toLowerCase().includes(origem.toLowerCase()) &&
        voo.destino.toLowerCase().includes(destino.toLowerCase())
    );

    setResultados(filtrados);
  };

  return (
    <div className="servicos-container">
      <h1>Buscar Passagens ✈️</h1>

      <div className="form-busca">
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

        <button onClick={buscarPassagens}>Buscar</button>
      </div>

      <div className="resultados">
        {resultados.length === 0 ? (
          <p>Nenhuma passagem encontrada...</p>
        ) : (
          resultados.map((voo) => (
            <div key={voo.id} className="card-voo">
              <h2>{voo.origem} → {voo.destino}</h2>
              <p>Companhia: {voo.companhia}</p>
              <p className="preco">R$ {voo.preco}</p>
              <button>Comprar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Servicos;