import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart } from "react-icons/fi";

const Home = () => {
  const items = [
    "Caja de Redbulls",
    "Caja de Monsters",
    "Caja de Vino Tinto",
    "Caja de Energizantes",
    "Caja de Café Premium"
  ];

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
        <div className="items-container">
          {items.map((item, index) => (
            <div key={index} className="item-card">
              <h3>{item}</h3>
              <button className="buy-button">COMPRAR</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;