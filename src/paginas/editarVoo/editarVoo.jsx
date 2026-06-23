import "./editarVoo.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function EditarVoo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const usuario = JSON.parse(
    localStorage.getItem("usuarioLogado")
  );

  if (!usuario) {
    navigate("/login");
    return null;
  }

  const usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioAtual = usuarios.find(
    (u) => u.id === usuario.id
  );

  const carteira = usuarioAtual?.passagens || [];

  const voo = carteira.find(
    (p) => String(p.id) === String(id)
  );

  const [origem, setOrigem] = useState(
    voo?.origem || ""
  );

  const [destino, setDestino] = useState(
    voo?.destino || ""
  );

  const [data, setData] = useState(
    voo?.data || ""
  );

  const [companhia, setCompanhia] = useState(
    voo?.companhia || ""
  );

  const salvarAlteracoes = () => {
    setErro("");

    if (
      !origem ||
      !destino ||
      !data ||
      !companhia
    ) {
      setErro("Preencha todos os campos.");
      return;
    }

    const novaCarteira = carteira.map((p) =>
      String(p.id) === String(id)
        ? {
            ...p,
            origem,
            destino,
            data,
            companhia,
          }
        : p
    );

    const indice = usuarios.findIndex(
      (u) => u.id === usuario.id
    );

    if (indice === -1) {
      setErro("Usuário não encontrado.");
      return;
    }

    usuarios[indice].passagens = novaCarteira;

    localStorage.setItem(
      "usuarios",
      JSON.stringify(usuarios)
    );

    localStorage.setItem(
      "usuarioLogado",
      JSON.stringify(usuarios[indice])
    );

    setSalvando(true);

    setTimeout(() => {
      navigate("/sobre");
    }, 1500);
  };

  if (!voo) {
    return (
      <div className="editar-voo-container">
        <div className="editar-voo">
          <h1>Voo não encontrado</h1>

          <button
            onClick={() => navigate("/sobre")}
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="editar-voo-container">
      <div className="editar-voo">
        <h1>Editar Voo</h1>

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

        <div className="editar-voo-botoes">
          <button
            className="editar-voo-cancelar"
            onClick={() => navigate("/sobre")}
          >
            Cancelar
          </button>

          <button
            disabled={salvando}
            onClick={salvarAlteracoes}
          >
            {salvando
              ? "✓ Salvo"
              : "Salvar Alterações"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarVoo;