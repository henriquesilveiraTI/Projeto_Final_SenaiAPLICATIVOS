import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
   <nav className="nav">
  <div className="nav-container">
    <div className="logomae">
      {/* <img src={logo} alt="logo" className="logo" /> */}
    </div>

    <ul>
      <li><Link to="/">Início</Link></li>
      <li><Link to="/sobre">Sobre</Link></li>
      <li><Link to="/servicos">Serviços</Link></li>
      <li><Link to="/contato">Contato</Link></li>
    </ul>
  </div>
</nav>
  );
}

export default NavBar;