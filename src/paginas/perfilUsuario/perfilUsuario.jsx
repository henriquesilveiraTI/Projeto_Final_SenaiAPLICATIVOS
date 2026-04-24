import "./perfilUsuario.css";


function PerfilUsuario() {
    return (
        <div className="perfil-usuario">

                <div className="dados-usuario">
                    <h2>Bem-vindo, {localStorage.getItem("usuarioLogado")}!</h2>
                </div>
        
        </div>
    );
}

export default PerfilUsuario;