import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const Shopping = () => {
  const { cart, clearCart, user, savePurchase } = useCart();
  const navigate = useNavigate();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsPurchasing(true);
    try {
      await savePurchase();
      setPurchaseSuccess(true);
      setTimeout(() => {
        clearCart();
        setPurchaseSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Purchase error:", error);
    } finally {
      setIsPurchasing(false);
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="page-container">
      <div className="back-button-container">
        <Link to="/" className="back-button">
          ← Volver al Inicio
        </Link>
      </div>
      <h1 className="page-title">CARRITO DE COMPRAS</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Tu carrito está vacío</p>
          <Link to="/" className="buy-button">
            Ver productos
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="product-category">{item.category}</p>
                  <p className="product-price">${item.price.toLocaleString('es-CL')}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${totalPrice.toLocaleString('es-CL')}</span>
            </div>
            <div className="summary-row">
              <span>Envío:</span>
              <span>Gratis</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${totalPrice.toLocaleString('es-CL')}</span>
            </div>

            <div className="cart-actions">
              <button
                className="secondary-button"
                onClick={clearCart}
                disabled={isPurchasing}
              >
                Vaciar carrito
              </button>
              <button
                className={`buy-button ${purchaseSuccess ? 'success' : ''}`}
                onClick={handlePurchase}
                disabled={isPurchasing || purchaseSuccess}
              >
                {isPurchasing 
                  ? 'Procesando...' 
                  : purchaseSuccess 
                    ? '✓ Compra exitosa' 
                    : `Comprar (${cart.length})`}
              </button>
            </div>

            {!user && (
              <p className="login-message">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link> para finalizar tu compra.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shopping;