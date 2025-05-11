import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart, FiGrid, FiList, FiStar } from "react-icons/fi";
import { useCart } from "./CartContext";
import { useState, useEffect } from "react";
import { getContainers } from "../utils/backend";
import data from "../../public/data.json";
import { getRecommendations } from "../utils/recommendationEngine";

const Home = () => {
  const { addToCart, isAuthenticated, currentUser, purchaseUpdate } = useCart();
  const [viewMode, setViewMode] = useState('grid');
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendationReason, setRecommendationReason] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        let containers = await getContainers();
        
        if (!containers || containers.length === 0) {
          containers = data.containers;
          setRecommendationReason("Usando datos locales");
        }

        // Obtener productos recomendados
        const recommended = getRecommendations(
          data.users, 
          containers, 
          isAuthenticated ? currentUser?.id : null
        );

        // Obtener todos los productos (excluyendo los ya recomendados)
        const otherProducts = containers.filter(
          product => !recommended.some(r => r.id === product.id)
        );

        setRecommendedProducts(recommended);
        setAllProducts(otherProducts);
        
        // Establecer el motivo de recomendación
        if (isAuthenticated && currentUser) {
          if (currentUser.purchases?.length > 0) {
            const lastPurchase = currentUser.purchases[currentUser.purchases.length - 1];
            const lastProduct = lastPurchase.items[0]?.name || '';
            setRecommendationReason(`Basado en tus compras recientes (${lastProduct})`);
          } else {
            setRecommendationReason("Productos populares para nuevos usuarios");
          }
        } else {
          setRecommendationReason("Productos más populares");
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setRecommendedProducts(data.containers.slice(0, 4));
        setAllProducts(data.containers.slice(4));
        setRecommendationReason("Usando datos de respaldo");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, [isAuthenticated, currentUser, purchaseUpdate]);

  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`${item.name} agregado al carrito!`);
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const renderProductCard = (item, isRecommended = false) => (
    <div key={item.id} className="item-card">
      {isRecommended && (
        <span className="recommended-badge">
          <FiStar size={14} /> Recomendado
        </span>
      )}
      <div className="product-image-container">
        <img 
          src={item.image} 
          alt={item.name}
          className="product-image"
          onError={(e) => {
            e.target.src = '/images/products/placeholder.jpg';
          }}
        />
      </div>
      <div className="product-details">
        <h3>{item.name}</h3>
        <p className="product-category">{item.category}</p>
        <div className="product-tags">
          {item.tags?.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <p className="product-price">${item.price.toLocaleString('es-CL')}</p>
      </div>
      <button 
        className="buy-button"
        onClick={() => handleAddToCart(item)}
      >
        COMPRAR
      </button>
    </div>
  );

  return (
    <div className="home-container">
      <header className="app-header">
        <h1 className="header-title">MYNO STORE</h1>
        <div className="header-icons">
          {isAuthenticated ? (
            <Link to="/user" className="icon-link">
              <FiUser /> Mi Cuenta
            </Link>
          ) : (
            <Link to="/login" className="icon-link">
              <FiUser /> Iniciar Sesión
            </Link>
          )}
          <Link to="/shopping" className="icon-link">
            <FiShoppingCart /> Carrito
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
          {recommendationReason && (
            <div className="recommendation-info">
              <FiStar className="recommendation-icon" />
              <span>{recommendationReason}</span>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando productos...</p>
          </div>
        ) : (
          <div className={`items-container ${viewMode}-view`}>
            {/* Sección de productos recomendados */}
            {recommendedProducts.length > 0 && (
              <>
                <h2 className="section-title">Recomendados para ti</h2>
                <div className="recommended-products">
                  {recommendedProducts.map(item => renderProductCard(item, true))}
                </div>
              </>
            )}

            {/* Sección de todos los productos */}
            {allProducts.length > 0 && (
              <>
                <h2 className="section-title">Todos nuestros productos</h2>
                <div className="all-products">
                  {allProducts.map(item => renderProductCard(item))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;