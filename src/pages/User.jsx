import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import { useCart } from './CartContext';

const User = () => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { user, logout } = useCart();

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

  if (!user) return null;

  return (
    <div className="page-container">
      <div className="user-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <FiArrowLeft /> Volver
        </button>
        <h1 className="page-title">MI PERFIL</h1>
        <button onClick={logout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>
      
      <div className="user-profile-grid">
        <div className="profile-container">
          <h2 className="profile-section-title">Información Personal</h2>
          <div className="profile-info">
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contacto:</strong> {user.phone}</p>
          </div>
        </div>

        <div className="purchases-container">
          <h2 className="profile-section-title">Historial de Compras</h2>
          <div className="purchases-list">
            {user.purchases.map((item, index) => (
              <div key={index} className="purchase-item">
                <p><strong>ID Producto:</strong> {item.containerId}</p>
                <p><strong>Fecha:</strong> {item.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de preferencias (corregida) */}
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
    </div>
  );
};

export default User;