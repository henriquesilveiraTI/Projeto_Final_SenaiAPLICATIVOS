import "./paginaPrincipal.css";
import { useNavigate } from "react-router-dom";

function PaginaPrincipal() {
  const navigate = useNavigate();

  const logado = localStorage.getItem("logado") === "true";
  const usuario = JSON.parse(localStorage.getItem("usuarioAtual"));

  function irParaServicos() {
    if (!logado) {
      navigate("/cadastro", { state: { from: "/servicos" } });
    } else {
      navigate("/servicos");
    }
  }

  return (
    <div>
      <section
        className="capa"
      >
        <div className="container">
          
          <h2 className="saudacoes">
            {logado && usuario
              ? `Bem-vindo, ${usuario.nome}`
              : "Seja bem-vindo"}
          </h2>

          <div className="venhavivermae">
            <h1 className="venhaviver">
             Nunca mais esqueça suas viagens novamente!
            </h1>
          </div>

          <div className="btnmae">
            <button onClick={irParaServicos} className="btn">
              Verifique sua próxima viagem
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}

export default PaginaPrincipal;