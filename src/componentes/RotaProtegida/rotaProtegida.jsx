import { Navigate, useLocation } from "react-router-dom";

function RotaProtegida({ children }) {
  const location = useLocation();

  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuario) {
    return (
      <Navigate
        to="/Cadastro"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
}

export default RotaProtegida;