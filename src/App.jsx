import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./componentes/NavBar/NavBar.jsx";
import Footer from "./componentes/Footer/Footer.jsx";
import Home from "./paginas/Home/Home.jsx";
import Sobre from "./paginas/Sobre/Sobre.jsx";
import Servicos from "./paginas/Servicos/Servicos.jsx";
import Contato from "./paginas/Contatos/Contatos.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;