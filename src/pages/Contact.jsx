import { Link } from "react-router-dom";

const Contact = () => {
    return (
      <div className="page-container">
        <div className="back-button-container">
          <Link to="/" className="back-button">
            ← Volver al Inicio
          </Link>
        </div>
        <h1 className="page-title">CONTACTO</h1>
        <div className="content">
          <p>Email: contacto@myno.com</p>
          <p>Teléfono: +56 9 8765 4321</p>
          <p>Dirección: Santiago Centro, Chile</p>
          <div style={{ marginTop: '2rem' }}>
            <h3>Formulario de contacto:</h3>
            <form style={{ marginTop: '1rem' }}>
              <input type="email" placeholder="Tu email" style={inputStyle} />
              <textarea placeholder="Mensaje" style={{...inputStyle, height: '100px'}} />
              <button type="submit" className="buy-button">ENVIAR</button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    margin: '0.5rem 0',
    background: '#1e1e1e',
    border: '1px solid #333',
    color: '#ffffff',
    borderRadius: '4px'
  };
  
  export default Contact;