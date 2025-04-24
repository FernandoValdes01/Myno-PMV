import { Link } from "react-router-dom";
import { useCart } from "./CartContext"; 

const Shopping = () => {
  const { cart, clearCart } = useCart();

  return (
    <div className="page-container">
      <div className="back-button-container">
        <Link to="/" className="back-button">
          ← Volver al Inicio
        </Link>
      </div>
      <h1 className="page-title">CARRITO DE COMPRAS</h1>
      
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`} className="item-card">
              <div>
                <h3>{item.name}</h3>
                <p>${item.price.toLocaleString('es-CL')}</p>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p>Total: ${cart.reduce((sum, item) => sum + item.price, 0).toLocaleString('es-CL')}</p>
            <button className="buy-button" onClick={clearCart}>
              VACIAR CARRITO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shopping;