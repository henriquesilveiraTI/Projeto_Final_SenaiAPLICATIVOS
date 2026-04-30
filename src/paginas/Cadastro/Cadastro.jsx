import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Cadastro.css";

function Cadastro() {
  const navigate = useNavigate();
  const location = useLocation();

  const destino = location.state?.from || "/";

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleCadastro() {
    if (!nome || !email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    const novoUsuario = {
      nome,
      email,
      senha,
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find(u => u.email === email);

    if (existe) {
      alert("Email já cadastrado!");
      return;
    }

    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // 🔥 PADRÃO CORRETO
    localStorage.setItem("logado", "true");
    localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));

    navigate(destino);
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h1 className="cadastro-titulo">Cadastre-se para prosseguir</h1>

        <input
          className="cadastro-input"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="cadastro-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="cadastro-input"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          className="cadastro-btn"
          onClick={handleCadastro}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default Cadastro;