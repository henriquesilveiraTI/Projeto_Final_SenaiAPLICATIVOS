import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sobre.css";

function Sobre() {
  const [passagens, setPassagens] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [vooParaRemover, setVooParaRemover] = useState(null);

  const navigate = useNavigate();

  const formatarData = (data) => {
    if (!data) return "";

    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("usuarioLogado")
    );

    setUsuario(user);

    if (!user) {
      setPassagens([]);
      return;
    }

    setPassagens(user.passagens || []);
  }, []);

  const pedirConfirmacaoRemocao = (id) => {
    setVooParaRemover(id);
    setMostrarConfirmacao(true);
  };

  const confirmarRemocao = () => {
  if (!usuario || !vooParaRemover) return;

  const usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

  const indice = usuarios.findIndex(
    (u) => u.id === usuario.id
  );

  if (indice === -1) return;

  usuarios[indice].passagens =
    (usuarios[indice].passagens || []).filter(
      (p) => p.id !== vooParaRemover
    );

  localStorage.setItem(
    "usuarios",
    JSON.stringify(usuarios)
  );

  localStorage.setItem(
    "usuarioLogado",
    JSON.stringify(usuarios[indice])
  );

  setUsuario(usuarios[indice]);

  setPassagens(
    usuarios[indice].passagens
  );

  setMostrarConfirmacao(false);
  setVooParaRemover(null);
};

  return (
    <div className="sobre-container">
      <h1>Minha Carteira de Passagens</h1>

      {!usuario ? (
        <p>Você precisa estar logado.</p>
      ) : passagens.length === 0 ? (
        <p>Nenhuma passagem salva.</p>
      ) : (
        <div className="lista-passagens">
          {passagens.map((voo) => (
            <div
              key={voo.id}
              className="card-passagem"
            >
              <h2>
                {voo.origem} → {voo.destino}
              </h2>

              <p>
                {formatarData(voo.data)}
              </p>

              <p>
                {voo.companhia}
              </p>

              <div className="acoes-passagem">
                <button
                  onClick={() =>
                    navigate(
                      `/editarvoo/${voo.id}`
                    )
                  }
                >
                  Editar
                </button>

                <button
                  onClick={() =>
                    pedirConfirmacaoRemocao(voo.id)
                  }
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {mostrarConfirmacao && (
        <div className="modal-overlay">
          <div className="modal-confirmacao">
            <h3>Remover passagem?</h3>

            <p>
              Esta ação não poderá ser desfeita.
            </p>

            <div className="modal-confirmacao-botoes">
              <button
                className="btn-cancelar"
                onClick={() => {
                  setMostrarConfirmacao(false);
                  setVooParaRemover(null);
                }}
              >
                Cancelar
              </button>

              <button
                className="btn-remover"
                onClick={confirmarRemocao}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sobre;