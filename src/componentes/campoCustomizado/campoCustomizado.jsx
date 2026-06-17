import "./CampoCustomizado.css";

function CampoCustomizado(props) {
  return (
    <input
      className="campo-customizado"
      {...props}
    />
  );
}

export default CampoCustomizado;