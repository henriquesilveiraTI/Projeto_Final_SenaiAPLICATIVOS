import {useState, useEffect } from "react";
import "./Servicos.css";

function Servicos() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [data, setData] = useState("");
  const [resultados, setResultados] = useState([]);


useEffect(() => {
  buscarPassagens();}, []);
  const buscarPassagens = () => {
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
        origem: "Brasília",
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
      {
        id: 4,
        origem: "Belo Horizonte",
        destino: "Paris",
        preco: 3800,
        companhia: "TAM",
      },
      {
        id: 5,
        origem: "Porto Alegre",
        destino: "Londres",
        preco: 4200,
        companhia: "Latam",
      },
      {
        id: 6,
        origem: "Curitiba",
        destino: "Tóquio",
        preco: 5000,
        companhia: "Gol",
      },
      {
        id: 7,
        origem: "Recife",
        destino: "Barcelona",
        preco: 3500,
        companhia: "Azul",
      },
      {
        id: 8,
        origem: "Salvador",
        destino: "Amsterdã",
        preco: 4000,
        companhia: "TAM",
      },
      {
        id: 9,
        origem: "Brasília",
        destino: "Dubai",
        preco: 4800,
        companhia: "Latam",
      },
      {
        id: 10,
        origem: "Manaus",
        destino: "Sydney",
        preco: 5500,
        companhia: "Gol",
      }
    ];

    const filtrados = dadosFake.filter((voo) => {
      return (
        voo.origem.toLowerCase().includes(origem.toLowerCase()) &&
        voo.destino.toLowerCase().includes(destino.toLowerCase())
      );
    });


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


        <button onClick={buscarPassagens}>Buscar</button>
      </div>

      <div className="resultados">
        {resultados.length === 0 ? (
          <p>Nenhuma passagem encontrada...</p>
        ) : (
          resultados.map((voo) => (
            <div key={voo.id} className="card-voo">
              <h2 className="titulo-voo">{voo.origem} → {voo.destino}</h2>
              <p className="companhia">Companhia: {voo.companhia}</p>
              <p className="preco">R$ {voo.preco}</p>
              <button className="btn-comprar">Comprar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Servicos;