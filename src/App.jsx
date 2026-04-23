import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import NavBar from "./componentes/NavBar/NavBar.jsx";
import Footer from "./componentes/Footer/Footer.jsx";
import Home from "./paginas/Home/Home.jsx";
import Sobre from "./paginas/Sobre/Sobre.jsx";
import Servicos from "./paginas/Servicos/Servicos.jsx";
import Contato from "./paginas/Contatos/Contatos.jsx";
import Cadastro from "./paginas/Cadastro/Cadastro.jsx";
import RotaProtegida from "./componentes/RotaProtegida/rotaProtegida.jsx";

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
      { path: "/sobre", element: <Sobre /> },
      { path: "/Cadastro", element: <Cadastro /> },
      { path: "/servicos", element: (<RotaProtegida><Servicos /></RotaProtegida>) },
      { path: "/contato", element: <Contato /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;