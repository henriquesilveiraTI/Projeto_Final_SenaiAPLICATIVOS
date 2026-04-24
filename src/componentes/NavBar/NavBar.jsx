import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import logo from "../../photos/logo.ico";
import { FaUserCircle } from "react-icons/fa";

function NavBar() {
  const navigate = useNavigate();

  const logado = localStorage.getItem("logado") === "true";
  const usuario = JSON.parse(localStorage.getItem("usuarioAtual") || "null");

  function irParaServicos() {
    if (!logado) {
      navigate("/cadastro", { state: { from: "/servicos" } });
    } else {
      navigate("/servicos");
    }
  }

  function irParaCadastro() {
    navigate("/cadastro");
  }

  return (
    <nav className="nav">
      <div className="nav-container">
        
        <div className="logomae">
          <img
            src={logo}
            alt="logo"
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        </div>

        <ul>
          <li onClick={() => navigate("/")}>Início</li>
          <li onClick={irParaServicos}>Passagens</li>
          <li onClick={() => navigate("/sobre")}>Sobre</li>
          <li onClick={() => navigate("/contato")}>Contato</li>

          <li
            className="usuario-box"
            onClick={!logado ? irParaCadastro : () => navigate("/perfil")}
          >
            <FaUserCircle  className="usuario-icone" />

            <span className="usuario-texto">
              {logado && usuario
                ? usuario.nome
                : "Cadastre-se"}
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;