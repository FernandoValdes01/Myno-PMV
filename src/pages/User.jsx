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
          {Array.isArray(user.purchases) && user.purchases.length > 0 ? (
            user.purchases.map((purchase, index) => (
              <div key={index} className="purchase-entry">
                <p className="text-muted"><strong>Fecha:</strong> {new Date(purchase.date).toLocaleString()}</p>
                {Array.isArray(purchase.items) ? (
                  <div className="purchases-list">
                    {purchase.items.map((item, idx) => (
                      <div key={idx} className="item-card">
                        <div className="product-image-container">
                          <img
                            src={item.image || "/images/products/placeholder.jpg"}
                            alt={item.name}
                            className="product-image"
                          />
                        </div>
                        <div className="product-details">
                          <h3>{item.name}</h3>
                          <p className="product-category">{item.category}</p>
                          <p className="product-price">
                            ${item.price.toLocaleString()} x{item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">Formato de compra no válido.</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted">No hay compras registradas aún.</p>
          )}
        </div>

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

// Datos simulados (en un proyecto real estos vendrían de una API o contexto)
const data = {
  containers: [
    {
      "id": 1,
      "name": "Caja de Redbulls",
      "price": 15000,
      "category": "Energizantes (Redbull, Monster)",
      "tags": ["bebida", "energizante"],
      "image": "/images/products/caja-redbulls.jpeg"
    },
    {
      "id": 2,
      "name": "Caja de Monsters",
      "price": 18000,
      "category": "Energizantes (Redbull, Monster)",
      "tags": ["bebida", "energizante"],
      "image": "/images/products/caja-monsters.jpg"
    },
    {
      "id": 3,
      "name": "Caja de Vino Tinto Reserva",
      "price": 25000,
      "category": "Vinos y Espumantes",
      "tags": ["alcohol", "premium"],
      "image": "/images/products/caja-vino-tinto-reserva.jpeg"
    },
    {
      "id": 4,
      "name": "Espumante Brut Premium",
      "price": 22000,
      "category": "Vinos y Espumantes",
      "tags": ["alcohol", "celebración"],
      "image": "/images/products/espumante-brut-premium.jpg"
    },
    {
      "id": 5,
      "name": "Whisky Glenfiddich 12 años",
      "price": 45000,
      "category": "Whiskys Premium",
      "tags": ["whisky", "premium"],
      "image": "/images/products/whisky-glenfiddich-12.jpg"
    },
    {
      "id": 6,
      "name": "Whisky Macallan Double Cask",
      "price": 69000,
      "category": "Whiskys Premium",
      "tags": ["whisky", "lujo"],
      "image": "/images/products/whisky-macallan-double.jpg"
    },
    {
      "id": 7,
      "name": "Pack de Cervezas IPA Artesanales",
      "price": 18000,
      "category": "Cervezas Artesanales",
      "tags": ["cerveza", "artesanal"],
      "image": "/images/products/pack-cervezas-ipa.jpg"
    },
    {
      "id": 8,
      "name": "Pack de Cervezas Stout",
      "price": 17000,
      "category": "Cervezas Artesanales",
      "tags": ["cerveza", "negra"],
      "image": "/images/products/pack-cervezas-stout.jpg"
    },
    {
      "id": 9,
      "name": "Set de Coctelería + Licor de Maracuyá",
      "price": 30000,
      "category": "Licores y Coctelería",
      "tags": ["coctel", "regalo"],
      "image": "/images/products/set-cocteleria-maracuya.jpg"
    },
    {
      "id": 10,
      "name": "Perfume Dior Sauvage 100ml",
      "price": 85000,
      "category": "Perfumes Importados",
      "tags": ["perfume", "lujo"],
      "image": "/images/products/perfume-dior-sauvage.jpg"
    },
    {
      "id": 11,
      "name": "Perfume Carolina Herrera 212 Men",
      "price": 78000,
      "category": "Perfumes Importados",
      "tags": ["perfume", "clásico"],
      "image": "/images/products/perfume-carolina-herrera.jpg"
    },
    {
      "id": 12,
      "name": "Pipa de Tabaco + Tabaco Premium",
      "price": 35000,
      "category": "Tabacos y Accesorios",
      "tags": ["tabaco", "accesorio"],
      "image": "/images/products/pipa-tabaco-premium.jpg"
    },
    {
      "id": 13,
      "name": "Pack de Snacks Gourmet (nueces, chips veggie)",
      "price": 12000,
      "category": "Snacks Premium",
      "tags": ["snack", "vegetariano"],
      "image": "/images/products/pack-snacks-gourmet.jpg"
    },
    {
      "id": 14,
      "name": "Caja de Café Premium Molido",
      "price": 20000,
      "category": "Cafés Especiales",
      "tags": ["café", "premium"],
      "image": "/images/products/caja-cafe-premium.jpg"
    },
    {
      "id": 15,
      "name": "Pack de Aguas Minerales Perrier",
      "price": 9000,
      "category": "Agua Mineral y Jugos",
      "tags": ["agua", "mineral"],
      "image": "/images/products/pack-aguas-perrier.jpg"
    }
  ]
};

export default User;
