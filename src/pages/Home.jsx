import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart, FiGrid, FiList } from "react-icons/fi";
import { useCart } from "./CartContext";
import { useState, useEffect } from "react";
import { getContainers } from "../utils/backend";
import Recommendations from "./Recommendations";

const Home = () => {
  const { addToCart, isAuthenticated } = useCart(); // Cambia user por isAuthenticated
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const containers = await getContainers();
        setProducts(containers);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`${item.name} agregado al carrito!`);
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <div>
      <header className="app-header">
        <h1 className="header-title">MYNO STORE</h1>
        <div className="header-icons">
          {isAuthenticated ? ( // Usa isAuthenticated aquí
            <Link to="/user" className="icon-link">
              <FiUser />
            </Link>
          ) : (
            <Link to="/login" className="icon-link">
              <FiUser /> Iniciar Sesión
            </Link>
          )}
          <Link to="/shopping" className="icon-link">
            <FiShoppingCart />
          </Link>
        </div>
      </header>

      <div className="container">
        <div className="view-options">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => toggleViewMode('grid')}
          >
            <FiGrid /> Grid
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => toggleViewMode('list')}
          >
            <FiList /> Lista
          </button>
        </div>

        {isLoading ? (
          <p>Cargando productos...</p>
        ) : (
          <>
            <div className={`items-container ${viewMode}-view`}>
              {products.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="product-image-container">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="product-image"
                    />
                  </div>
                  <div className="product-details">
                    <h3>{item.name}</h3>
                    <p className="product-category">{item.category}</p>
                    <p className="product-price">${item.price.toLocaleString('es-CL')}</p>
                  </div>
                  <button 
                    className="buy-button"
                    onClick={() => handleAddToCart(item)}
                  >
                    COMPRAR
                  </button>
                </div>
              ))}
            </div>
            
            {isAuthenticated && <Recommendations />} {/* Usa isAuthenticated aquí */}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;