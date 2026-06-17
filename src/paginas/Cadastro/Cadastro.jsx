import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CampoCustomizado from "../../componentes/campoCustomizado/campoCustomizado";
import "./Cadastro.css";

function Cadastro() {
  const navigate = useNavigate();
  const location = useLocation();

  const destino = location.state?.from || "/";

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleCadastro(e) {
  e.preventDefault();

  setErro("");

  const novoUsuario = {
  id: crypto.randomUUID(),
  nome,
  email,
  senha,
  passagens: [],
};

  const usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

  const existe = usuarios.find(
    (u) => u.email === email
  );

  if (existe) {
    setErro("Este email já está cadastrado");
    return;
  }

  usuarios.push(novoUsuario);

  localStorage.setItem(
    "usuarios",
    JSON.stringify(usuarios)
  );

  localStorage.setItem(
    "usuarioLogado",
    JSON.stringify(novoUsuario)
  );

  window.dispatchEvent(
    new Event("authChange")
  );

  navigate(destino);
}

  return (
    <div className="cadastro-container">
      <form className="cadastro-box" onSubmit={handleCadastro}>
        <div className="auth-tabs">
          <button
            type="button"
            className="auth-tab auth-tab--active"
          >
            Cadastro
          </button>

          <button
            type="button"
            className="auth-tab"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        <h1 className="cadastro-titulo">
          Cadastre-se para prosseguir
        </h1>

        <CampoCustomizado
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <CampoCustomizado
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <CampoCustomizado
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {erro && (
          <div className="cadastro-erro">
            {erro}
          </div>
        )}

        <button
          className="cadastro-btn"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;