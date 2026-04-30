import "./paginaPrincipal.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function PaginaPrincipal() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuarioLogado") || "null")
  );

  const logado = !!usuario;

  useEffect(() => {
    const atualizarUsuario = () => {
      const user = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
      setUsuario(user);
    };

    window.addEventListener("authChange", atualizarUsuario);

    return () => {
      window.removeEventListener("authChange", atualizarUsuario);
    };
  }, []);

  function irParaServicos() {
    if (!logado) {
      navigate("/cadastro", { state: { from: "/servicos" } });
    } else {
      navigate("/servicos");
    }
  }

  return (
    <div>
      <section className="capa">
        <div className="container">

          <h2 className="saudacoes">
            {logado
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