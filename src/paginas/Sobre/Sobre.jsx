import { useEffect, useState } from "react";
import "./Sobre.css";

function Sobre() {
  const [passagens, setPassagens] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({
    origem: "",
    destino: "",
    data: "",
    companhia: ""
  });

  const formatarData = (data) => {
    if (!data) return "";

    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));
    setUsuario(user);

    if (!user) {
      setPassagens([]);
      return;
    }

    const chave = `carteira_${user.email}`;
    const dados = JSON.parse(localStorage.getItem(chave)) || [];

    setPassagens(dados);
  }, []);

  const editar = (voo) => {
    setEditandoId(voo.id);
    setForm({
      origem: voo.origem,
      destino: voo.destino,
      data: voo.data,
      companhia: voo.companhia
    });
  };

  const handleChange = (campo, valor) => {
    setForm({ ...form, [campo]: valor });
  };

  const salvarEdicao = () => {
    const chave = `carteira_${usuario.email}`;

    const atualizadas = passagens.map((p) =>
      p.id === editandoId ? { ...p, ...form } : p
    );

    setPassagens(atualizadas);
    localStorage.setItem(chave, JSON.stringify(atualizadas));

    setEditandoId(null);
  };

  const remover = (id) => {
    if (!usuario) return;

    const chave = `carteira_${usuario.email}`;
    const atualizadas = passagens.filter((p) => p.id !== id);

    setPassagens(atualizadas);
    localStorage.setItem(chave, JSON.stringify(atualizadas));
  };

  return (
    <div className="sobre-container">
      <h1>Minha Carteira de Passagens</h1>

      {!usuario ? (
        <p>Você precisa estar logado.</p>
      ) : passagens.length === 0 ? (
        <p>Nenhuma passagem salva</p>
      ) : (
        <div className="lista-passagens">
          {passagens.map((voo) => (
            <div key={voo.id} className="card-passagem">

              {editandoId === voo.id ? (
                <div className="form-edicao">
                  <input
                    className="input-edicao"
                    value={form.origem}
                    onChange={(e) => handleChange("origem", e.target.value)}
                    placeholder="Origem"
                  />

                  <input
                    className="input-edicao"
                    value={form.destino}
                    onChange={(e) => handleChange("destino", e.target.value)}
                    placeholder="Destino"
                  />

                  <input
                    className="input-edicao"
                    type="date"
                    value={form.data}
                    onChange={(e) => handleChange("data", e.target.value)}
                  />

                  <input
                    className="input-edicao"
                    value={form.companhia}
                    onChange={(e) => handleChange("companhia", e.target.value)}
                    placeholder="Companhia"
                  />

                  <div className="botoes-edicao">
                    <button onClick={salvarEdicao}>Salvar</button>
                    <button onClick={() => setEditandoId(null)}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <>
                  <h2>{voo.origem} → {voo.destino}</h2>

                  <p>{formatarData(voo.data)}</p>

                  <p>{voo.companhia}</p>

                  <button onClick={() => editar(voo)}>Editar</button>
                  <button onClick={() => remover(voo.id)}>Remover</button>
                </>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sobre;