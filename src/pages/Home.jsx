import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart, FiGrid, FiList, FiStar, FiSearch, FiFilter, FiX } from "react-icons/fi";
import { useCart } from "./CartContext";
import { useState, useEffect } from "react";
import { getContainers } from "../utils/backend";
import data from "../../public/data.json";
import { getRecommendations } from "../utils/recommendationEngine";

const Home = () => {
  const { addToCart, isAuthenticated, currentUser, purchaseUpdate } = useCart();
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendationReason, setRecommendationReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        let containers = await getContainers();
        
        if (!containers || containers.length === 0) {
          containers = data.containers;
          setRecommendationReason("Usando datos locales");
        }

        // Extraer categorías únicas
        const categories = [...new Set(containers.map(item => item.category))];
        setAvailableCategories(categories);

        // Guardar todos los productos
        setProducts(containers);

        // Obtener productos recomendados
        const recommended = getRecommendations(
          data.users || [], 
          containers, 
          isAuthenticated ? currentUser?.id : null
        );

        setRecommendedProducts(recommended);
        setFilteredProducts(containers); // Mostrar todos los productos inicialmente
        
        // Establecer el motivo de recomendación
        if (isAuthenticated && currentUser) {
          if (currentUser.purchases?.length > 0) {
            const lastPurchase = currentUser.purchases[currentUser.purchases.length - 1];
            const lastProduct = containers.find(c => c.id === lastPurchase.containerId)?.name || '';
            setRecommendationReason(`Basado en tus compras recientes${lastProduct ? ` (${lastProduct})` : ''}`);
          } else {
            setRecommendationReason("Productos populares para nuevos usuarios");
          }
        } else {
          setRecommendationReason("Productos más populares");
        }
      } catch (error) {
        console.error("Error loading products:", error);
        const containers = data.containers || [];
        setProducts(containers);
        setRecommendedProducts(containers.slice(0, 4));
        setFilteredProducts(containers);
        setRecommendationReason("Usando datos de respaldo");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, [isAuthenticated, currentUser, purchaseUpdate]);

  useEffect(() => {
    // Aplicar filtros cuando cambian los parámetros
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item =>
        selectedCategories.includes(item.category)
      );
    }

    filtered = filtered.filter(item =>
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [searchTerm, priceRange, selectedCategories, products]);

  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`${item.name} agregado al carrito!`);
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 100000]);
    setSelectedCategories([]);
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
          src={item.image || '/images/products/placeholder.jpg'} 
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
        {item.tags && item.tags.length > 0 && (
          <div className="product-tags">
            {item.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
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
          <div className="search-filter-container">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="clear-search"
                >
                  <FiX />
                </button>
              )}
            </div>
            <button 
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> Filtros
            </button>
          </div>

          <div className="view-mode-buttons">
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

          {recommendationReason && (
            <div className="recommendation-info">
              <FiStar className="recommendation-icon" />
              <span>{recommendationReason}</span>
            </div>
          )}
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-section">
              <h3 className="filter-title">Categorías</h3>
              <div className="category-filters">
                {availableCategories.map(category => (
                  <button
                    key={category}
                    className={`category-filter ${selectedCategories.includes(category) ? 'active' : ''}`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Rango de precios</h3>
              <div className="price-range">
                <span>${priceRange[0].toLocaleString('es-CL')}</span>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="price-slider"
                />
                <span>${priceRange[1].toLocaleString('es-CL')}</span>
              </div>
            </div>

            <button 
              className="secondary-button reset-filters"
              onClick={resetFilters}
            >
              <FiX /> Limpiar filtros
            </button>
          </div>
        )}

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
            {filteredProducts.length > 0 ? (
              <>
                <h2 className="section-title">
                  {searchTerm || selectedCategories.length > 0 || priceRange[1] < 100000
                    ? `Productos encontrados (${filteredProducts.length})`
                    : 'Todos nuestros productos'}
                </h2>
                <div className="all-products">
                  {filteredProducts.map(item => renderProductCard(item))}
                </div>
              </>
            ) : (
              <div className="empty-results">
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar tus filtros de búsqueda</p>
                <button 
                  className="secondary-button"
                  onClick={resetFilters}
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;