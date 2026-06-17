import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CampoCustomizado from "../../componentes/campoCustomizado/campoCustomizado";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const destino = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    setErro("");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuario) {
      setErro("Email ou senha inválidos");
      return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    window.dispatchEvent(new Event("authChange"));

    navigate(destino);
  }

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <div className="auth-tabs">
          <button
            type="button"
            className="auth-tab"
            onClick={() => navigate("/cadastro")}
          >
            Cadastro
          </button>

          <button
            type="button"
            className="auth-tab auth-tab--active"
          >
            Login
          </button>
        </div>

        <h1 className="login-titulo">
          Entre na sua conta
        </h1>

        <CampoCustomizado
          placeholder="Email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <CampoCustomizado
          placeholder="Senha"
          value={senha}
          type="password"
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {erro && (
          <div className="login-erro">
            {erro}
          </div>
        )}

        <button
          className="login-btn"
          type="submit"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;