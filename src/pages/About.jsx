import { Link } from "react-router-dom"; // Agrega esto en la parte superior del archivo
const About = () => {
    return (
      <div className="page-container">
        <h1 className="page-title">TECNOLOGÍA Y PRIVACIDAD</h1>
        
        <div className="about-section">
          <h2 className="section-title">Nuestro Sistema de Recomendaciones</h2>
          <div className="section-content">
            <p>
              En MYNO utilizamos algoritmos de <strong>Machine Learning</strong> que analizan patrones de compra 
              anonimizados para ofrecerte recomendaciones personalizadas. Nuestro sistema:
            </p>
            <ul className="feature-list"> 
              <li>Analiza preferencias basadas en tu historial de compras</li>
              <li>Compara con patrones similares de otros usuarios</li>
              <li>Predice productos que podrían interesarte</li>
              <li>Mejora continuamente con cada interacción</li>
            </ul>
          </div>
        </div>
  
        <div className="about-section privacy-section">
          <h2 className="section-title">Compromiso con tu Privacidad</h2>
          <div className="section-content">
            <p>
              <strong>Política de Datos:</strong> MYNO <u>nunca</u> comparte, vende o externaliza información 
              personal o de compras de nuestros usuarios. Tus datos solo se utilizan para:
            </p>
            <ol className="privacy-list">
              <li>Mejorar tu experiencia de compra personalizada</li>
              <li>Optimizar nuestro catálogo de productos</li>
              <li>Desarrollar mejores funciones de recomendación</li>
            </ol>
            <p className="highlight-box">
              💡 Puedes solicitar la eliminación de tu historial de compras en cualquier momento 
              contactando a nuestro <Link to="/contact" className="inline-link">equipo de soporte</Link>. 
              Los datos se eliminarán permanentemente en un plazo máximo de 72 horas.
            </p>
          </div>
        </div>
  
        <div className="about-section">
          <h2 className="section-title">Nuestra Filosofía</h2>
          <p className="philosophy-text">
            "En MYNO creemos que la tecnología debe servir para crear experiencias más 
            inteligentes, no para invadir tu privacidad. Cada recomendación que generamos 
            pasa por estrictos protocolos de seguridad y anonimización de datos."
          </p>
          <p className="signature">— Equipo MYNO</p>
        </div>
      </div>
    );
  };
  
  export default About;