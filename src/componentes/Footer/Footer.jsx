import React from "react";
import "./Footer.css";
import logo from "../../photos/logo.ico";

import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        <img src={logo} alt="logo" className="logoF" />

        <p className="footer-text">
          © {year} - Todos os direitos reservados
        </p>

        <div className="socials">
          <a href="#" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>

          <a href="#" target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>

          <a href="#" target="_blank" rel="noreferrer">
            <FaWhatsapp />
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;