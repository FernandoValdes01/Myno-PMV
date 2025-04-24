import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart, FiGrid, FiList } from "react-icons/fi";
import { useCart } from "./CartContext";
import { useState } from "react";
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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  
  
const items = [
  { id: 1, name: "Caja de Redbulls", price: 15000, category: "Energizantes (Redbull, Monster)",image:RedbullImage},
  { id: 2, name: "Caja de Monsters", price: 18000, category: "Energizantes (Redbull, Monster)",image:MonsterImage},
  { id: 3, name: "Caja de Vino Tinto Reserva", price: 25000, category: "Vinos y Espumantes",image:VinoTintoImage},
  { id: 4, name: "Espumante Brut Premium", price: 22000, category: "Vinos y Espumantes" ,image:EspumanteImage},
  { id: 5, name: "Whisky Glenfiddich 12 años", price: 45000, category: "Whiskys Premium",image:WhiskyGlenfiddichImage},
  { id: 6, name: "Whisky Macallan Double Cask", price: 69000, category: "Whiskys Premium" ,image:WhiskyMacallanImage},
  { id: 7, name: "Pack de Cervezas IPA Artesanales", price: 18000, category: "Cervezas Artesanales",image:CervezasIPAImage},
  { id: 8, name: "Pack de Cervezas Stout", price: 17000, category: "Cervezas Artesanales",image:CervezasStoutImage},
  { id: 9, name: "Set de Coctelería + Licor de Maracuyá", price: 30000, category: "Licores y Coctelería" ,image:CocteleriaImage},
  { id: 10, name: "Perfume Dior Sauvage 100ml", price: 85000, category: "Perfumes Importados" ,image:PerfumeDiorImage},
  { id: 11, name: "Perfume Carolina Herrera 212 Men", price: 78000, category: "Perfumes Importados",image:PerfumeCarolinaImage},
  { id: 12, name: "Pipa de Tabaco + Tabaco Premium", price: 35000, category: "Tabacos y Accesorios" ,image:TabacoImage},
  { id: 13, name: "Pack de Snacks Gourmet (nueces, chips veggie)", price: 12000, category: "Snacks Premium",image:SnacksImage},
  { id: 14, name: "Caja de Café Premium Molido", price: 20000, category: "Cafés Especiales",image:CafeImage},
  { id: 15, name: "Pack de Aguas Minerales Perrier", price: 9000, category: "Agua Mineral y Jugos",image:AguaMineralImage}
];

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