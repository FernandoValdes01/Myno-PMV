import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart, FiGrid, FiList } from "react-icons/fi";
import { useCart } from "./CartContext";
import { useState, useEffect } from "react";
import { getContainers } from "../utils/backend";
import { 
  RedbullImage,
  MonsterImage,
  VinoTintoImage,
  EspumanteImage,
  WhiskyGlenfiddichImage,
  WhiskyMacallanImage,
  CervezasIPAImage,
  CervezasStoutImage,
  CocteleriaImage,
  PerfumeDiorImage,
  PerfumeCarolinaImage,
  TabacoImage,
  SnacksImage,
  CafeImage,
  AguaMineralImage
} from '@/assets/images'; 

const Home = () => {
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar productos desde data.json
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
        <Link to="/user" className="icon-link">
          <FiUser />
        </Link>
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

      <div className={`items-container ${viewMode}-view`}>
        {items.map((item) => (
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
    </div>
  </div>
);
};

export default Home;