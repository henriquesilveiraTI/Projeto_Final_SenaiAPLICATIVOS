import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";

import NavBar from "./componentes/NavBar/NavBar.jsx";
import Footer from "./componentes/Footer/Footer.jsx";

import Home from "./paginas/Home/Home.jsx";
import Sobre from "./paginas/Sobre/Sobre.jsx";
import Servicos from "./paginas/Servicos/Servicos.jsx";
import Cadastro from "./paginas/Cadastro/Cadastro.jsx";
import PerfilUsuario from "./paginas/perfilUsuario/perfilUsuario.jsx";

import RotaProtegida from "./componentes/RotaProtegida/rotaProtegida.jsx";

function Layout() {
  const location = useLocation();

  const esconderFooter = location.pathname === "/servicos";
  return (
    <div className="app">
      <NavBar />

      <main className="content">
        <Outlet />
      </main>

      { !esconderFooter && <Footer /> }
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },

      {
        path: "/sobre",
        element: (
          <RotaProtegida>
            <Sobre />
          </RotaProtegida>
        ),
      },

      { path: "/cadastro", element: <Cadastro /> },

      {
        path: "/servicos",
        element: (
          <RotaProtegida>
            <Servicos />
          </RotaProtegida>
        ),
      },

      { path: "/perfil", element: <PerfilUsuario /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;