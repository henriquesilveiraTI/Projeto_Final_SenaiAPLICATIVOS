import { Navigate } from "react-router-dom";

function RotaProtegida({ children }) {
  const logado = localStorage.getItem("logado");

  if (!logado) {
    return <Navigate to="/cadastro" />;
  }

  return children;
}

export default RotaProtegida;