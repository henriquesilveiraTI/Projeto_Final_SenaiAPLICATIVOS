import "./Footer.css";

import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">© {new Date().getFullYear()} - Senai Projeto</p>

        <div className="footer-icons">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon facebook"
          >
            <FaFacebook />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon linkedin"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;