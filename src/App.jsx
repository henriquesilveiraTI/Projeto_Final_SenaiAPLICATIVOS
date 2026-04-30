import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import NavBar from "./componentes/NavBar/NavBar.jsx";
import Footer from "./componentes/Footer/Footer.jsx";
import Home from "./paginas/Home/Home.jsx";
import Sobre from "./paginas/Sobre/Sobre.jsx";
import Servicos from "./paginas/Servicos/Servicos.jsx";
import Contato from "./paginas/Contatos/Contatos.jsx";
import Cadastro from "./paginas/Cadastro/Cadastro.jsx";
import RotaProtegida from "./componentes/RotaProtegida/rotaProtegida.jsx";
import PerfilUsuario from "./paginas/perfilUsuario/perfilUsuario.jsx";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },

      // 👇 AGORA "Sobre" VAI SER SUA CARTEIRA
      { 
        path: "/sobre", 
        element: (
          <RotaProtegida>
            <Sobre />
          </RotaProtegida>
        ) 
      },

      { path: "/Cadastro", element: <Cadastro /> },

      { 
        path: "/servicos", 
        element: (
          <RotaProtegida>
            <Servicos />
          </RotaProtegida>
        ) 
      },

      { path: "/contato", element: <Contato /> },
      { path: "/perfil", element: <PerfilUsuario /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;