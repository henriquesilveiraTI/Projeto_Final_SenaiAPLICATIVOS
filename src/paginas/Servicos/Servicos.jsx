import { useState, useEffect } from "react";
import "./Servicos.css";

function Servicos() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [data, setData] = useState("");
  const [companhia, setCompanhia] = useState("");
  const [editandoId, setEditandoId] = useState(null);

 const [passagens, setPassagens] = useState(() => {
  const dados = localStorage.getItem("passagens");
  return dados ? JSON.parse(dados) : [];
});
  useEffect(() => {
    localStorage.setItem("passagens", JSON.stringify(passagens));
  }, [passagens]);

  const salvarPassagem = () => {
    if (!origem || !destino || !data || !companhia) {
      alert("Preencha todos os campos!");
      return;
    }

    if (editandoId !== null) {       
      const atualizadas = passagens.map((p) =>
        p.id === editandoId
          ? { ...p, origem, destino, data, companhia }
          : p
      );
      setPassagens(atualizadas);
      setEditandoId(null);
    } else {
      const nova = {
        id: Date.now(),
        origem,
        destino,
        data,
        companhia,
      };
      setPassagens([...passagens, nova]);
    }

    limparCampos();
  };

  const limparCampos = () => {
    setOrigem("");
    setDestino("");
    setPreco("");
    setCompanhia("");
  };

  const removerPassagem = (id) => {
    const filtradas = passagens.filter((p) => p.id !== id);
    setPassagens(filtradas);
  };

  const editarPassagem = (passagem) => {
    setOrigem(passagem.origem);
    setDestino(passagem.destino);
    setData(passagem.data);
    setCompanhia(passagem.companhia);
    setEditandoId(passagem.id);
  };

  return (
    <div className="servicos-container">
      <h1>Carteira de Passagens</h1>

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
          placeholder="Data"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <input
          type="text"
          placeholder="Companhia"
          value={companhia}
          onChange={(e) => setCompanhia(e.target.value)}
        />

        <button onClick={salvarPassagem}>
          {editandoId ? "Atualizar" : "Adicionar"}
        </button>
      </div>

      <div className="resultados">
        {passagens.length === 0 ? (
          <p>Nenhuma passagem cadastrada...</p>
        ) : (
          passagens.map((voo) => (
            <div key={voo.id} className="card-voo">
              <h2>{voo.origem} → {voo.destino}</h2>
              <p>Companhia: {voo.companhia}</p>
              <p>{voo.data}</p>

              <button onClick={() => editarPassagem(voo)}>
                Editar
              </button>
              <button onClick={() => removerPassagem(voo.id)}>
                Remover
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Servicos;