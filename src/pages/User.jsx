import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const User = () => {
  const navigate = useNavigate();
  
  const userData = {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "+56 9 1234 5678",
    purchases: [
      { id: 1, product: "Caja de Monsters", date: "15/05/2024", price: "$12.990" },
      { id: 2, product: "Pack de Vino Tinto", date: "02/04/2024", price: "$24.990" },
      { id: 3, product: "Redbull Individual", date: "20/03/2024", price: "$2.490" }
    ]
  };

  return (
    <div className="page-container">
      <div className="user-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <FiArrowLeft /> Volver
        </button>
        <h1 className="page-title">MI PERFIL</h1>
      </div>
      
      <div className="user-profile-grid">
        {/* Contenedor de información personal */}
        <div className="profile-container">
          <h2 className="profile-section-title">Información Personal</h2>
          <div className="profile-info">
            <p><strong>Nombre:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Contacto:</strong> {userData.phone}</p>
          </div>
        </div>

        {/* Contenedor de compras anteriores */}
        <div className="purchases-container">
          <h2 className="profile-section-title">Historial de Compras</h2>
          <div className="purchases-list">
            {userData.purchases.map((item) => (
              <div key={item.id} className="purchase-item">
                <div className="purchase-details">
                  <span className="purchase-product">{item.product}</span>
                  <span className="purchase-date">{item.date}</span>
                </div>
                <span className="purchase-price">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="profile-footer">
        <p>Para más información:</p>
        <div className="info-links">
          <Link to="/contact" className="info-link">Contacto</Link>
          <span> - </span>
          <Link to="/about" className="info-link">Sobre Nosotros</Link>
        </div>
      </div>
    </div>
  );
};

export default User;