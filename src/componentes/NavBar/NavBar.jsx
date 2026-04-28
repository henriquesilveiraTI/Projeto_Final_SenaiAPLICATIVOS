import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../photos/logo.ico";
import { FaUserCircle } from "react-icons/fa";

function NavBar() {
  const navigate = useNavigate();

  const [menuAberto, setMenuAberto] = useState(false);

  const logado = localStorage.getItem("logado") === "true";
  const usuario = JSON.parse(localStorage.getItem("usuarioAtual") || "null");

  function irParaServicos() {
    if (!logado) {
      navigate("/cadastro", { state: { from: "/servicos" } });
    } else {
      navigate("/servicos");
    }
    setMenuAberto(false); // fecha menu ao clicar
  }

  function irParaCadastro() {
    navigate("/cadastro");
    setMenuAberto(false);
  }

  function navegar(path) {
    navigate(path);
    setMenuAberto(false); 
  }

  return (
    <nav className="nav">
      <div className="nav-container">
        
        <div className="logomae">
          <img
            src={logo}
            alt="logo"
            className="logo"
            onClick={() => navegar("/")}
          />
        </div>

        <div 
          className="menu-toggle"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          ☰
        </div>

        <ul className={menuAberto ? "ativo" : ""}>
          <li onClick={() => navegar("/")}>Início</li>
          <li onClick={irParaServicos}>Passagens</li>
          <li onClick={() => navegar("/sobre")}>Sobre</li>
          <li onClick={() => navegar("/contato")}>Contato</li>

          <li
            className="usuario-box"
            onClick={!logado ? irParaCadastro : () => navegar("/perfil")}
          >
            <FaUserCircle className="usuario-icone" />

            <span className="usuario-texto">
              {logado && usuario ? usuario.nome : "Cadastre-se"}
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;