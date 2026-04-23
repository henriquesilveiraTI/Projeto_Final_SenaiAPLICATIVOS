import "./paginaPrincipal.css";

function PaginaPrincipal() {
  return (
    <div>
      <section
        className="capa"
        // style={{ backgroundImage: `url(${capa})` }}
      >
        <div className="container">
          <h2 className="saudacoes">Seja bem-vindo</h2>

          <div className="venhavivermae">
            <h1 className="venhaviver">
              Venha viver uma nova experiência
            </h1>
          </div>

          <div className="btnmae">
            <button className="btn">Saiba mais</button>
          </div>
        </div>
      </section>

      <h2 className="titulo-1">Nossos Serviços</h2>

      <div className="icons">
        <div className="um-icon">
          <div>
            <h3 className="tituloS">Qualidade</h3>
            <p className="textoS">
              Trabalhamos com excelência e dedicação.
            </p>
          </div>
        </div>

        <div className="um-icon">
          <div>
            <h3 className="tituloS">Confiança</h3>
            <p className="textoS">
              Clientes satisfeitos são nossa prioridade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginaPrincipal;