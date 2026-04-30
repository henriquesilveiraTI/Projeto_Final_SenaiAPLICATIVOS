import { useEffect, useState } from "react";
import "./perfilUsuario.css";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
    setUsuario(user);

    const atualizarUsuario = () => {
      const user = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
      setUsuario(user);
    };

    window.addEventListener("authChange", atualizarUsuario);

    return () => {
      window.removeEventListener("authChange", atualizarUsuario);
    };
  }, []);

  function logout() {
    localStorage.removeItem("usuarioLogado");
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  }

  if (!usuario) {
    return (
      <div className="perfil-container">
        <div className="perfil-card">
          <h2>Você não está logado</h2>
          <button onClick={() => navigate("/cadastro")}>
            Ir para cadastro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h2>Meu Perfil</h2>

        <div className="perfil-info">
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
        </div>

        <div className="perfil-botoes">
          <button className="btn-sair" onClick={logout}>
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;