import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

function NavBar() {
  const navigate = useNavigate();

  const [menuAberto, setMenuAberto] = useState(false);
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
      navigate("/Cadastro", { state: { from: "/servicos" } });
    } else {
      navigate("/servicos");
    }
    setMenuAberto(false);
  }

  function irParaCadastro() {
    navigate("/Cadastro");
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
            src={"./photos/logo.ico"}
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
          <li onClick={() => navegar("/Sobre")}>Carteira</li>
          <li onClick={() => navegar("/contato")}>Contato</li>

          <li
            className="usuario-box"
            onClick={!logado ? irParaCadastro : () => navegar("/perfil")}
          >
            <FaUserCircle className="usuario-icone" />

            <span className="usuario-texto">
              {logado ? usuario.nome : "Cadastre-se"}
            </span>
          </li>

         
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;