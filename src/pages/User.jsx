import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";

const User = () => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  
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

  const productCategories = [
    "Energizantes (Redbull, Monster)",
    "Vinos y Espumantes",
    "Whiskys Premium",
    "Cervezas Artesanales",
    "Licores y Coctelería",
    "Perfumes Importados",
    "Tabacos y Accesorios",
    "Snacks Premium",
    "Cafés Especiales",
    "Agua Mineral y Jugos"
  ];

  const handleProductToggle = (product) => {
    setSelectedProducts(prev => 
      prev.includes(product) 
        ? prev.filter(item => item !== product) 
        : [...prev, product]
    );
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

        {/* Nueva sección de preferencias */}
        <div className="preferences-container">
          <h2 className="profile-section-title">Cuéntanos de ti ¿Qué quieres vender?</h2>
          <div className="preferences-list">
            {productCategories.map((product, index) => (
              <div key={index} className="preference-item">
                <input
                  type="checkbox"
                  id={`product-${index}`}
                  checked={selectedProducts.includes(product)}
                  onChange={() => handleProductToggle(product)}
                  className="custom-checkbox"
                />
                <label htmlFor={`product-${index}`}>{product}</label>
              </div>
            ))}
          </div>
          {selectedProducts.length > 0 && (
            <div className="selected-summary">
              <p>Tus selecciones: {selectedProducts.join(", ")}</p>
            </div>
          )}
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