import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiTrash2, FiChevronLeft, FiCreditCard, FiCheckCircle } from "react-icons/fi";
import { useCart } from "./CartContext";

const Shopping = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity,
    currentUser,
    isAuthenticated,
    clearCart,
    savePurchase
  } = useCart();
  
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const userDiscount = isAuthenticated && currentUser?.purchases?.length > 5 ? 0.1 : 0;
    setTotal(subtotal * (1 - userDiscount));
    setDiscount(subtotal * userDiscount);
  }, [cartItems, currentUser, isAuthenticated]);

  const handleCheckout = async () => {
  if (!isAuthenticated) {
    navigate('/login');
    return;
  }

  setIsProcessing(true);
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    await savePurchase();
    setPurchaseSuccess(true);
    
    setTimeout(() => {
      clearCart();
      setPurchaseSuccess(false);
    }, 3000);
    
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Error al procesar el pago");
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div className="shopping-page">
      <header className="shopping-header">
        <Link to="/" className="back-button">
          <FiChevronLeft /> Seguir comprando
        </Link>
        <h1><FiShoppingCart /> Mi Carrito</h1>
      </header>

      <div className="shopping-content">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            {purchaseSuccess ? (
              <>
                <FiCheckCircle className="success-icon" />
                <h2>¡Compra realizada con éxito!</h2>
                <p>Gracias por tu compra</p>
              </>
            ) : (
              <>
                <img src="/images/empty-cart.png" alt="Carrito vacío" />
                <h2>Tu carrito está vacío</h2>
                <Link to="/" className="continue-shopping">
                  Descubre nuestros productos
                </Link>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.quantity}`} className="cart-item">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="item-image"
                    onError={(e) => {
                      e.target.src = '/images/products/placeholder.jpg';
                    }}
                  />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-category">{item.category}</p>
                    <div className="item-quantity">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toLocaleString('es-CL')}
                  </div>
                  <button 
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Resumen de compra</h2>
              <div className="summary-row">
                <span>Subtotal ({cartItems.reduce((count, item) => count + item.quantity, 0)} items)</span>
                <span>${(total + discount).toLocaleString('es-CL')}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Descuento (10%)</span>
                  <span>-${discount.toLocaleString('es-CL')}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toLocaleString('es-CL')}</span>
              </div>
              <button 
                className={`checkout-button ${purchaseSuccess ? 'success' : ''}`}
                onClick={handleCheckout}
                disabled={isProcessing || purchaseSuccess}
              >
                {isProcessing ? 'Procesando...' : 
                 purchaseSuccess ? '✓ Compra exitosa' : 
                 'Finalizar compra'}
              </button>

              {!isAuthenticated && (
                <p className="login-message">
                  <Link to="/login">Inicia sesión</Link> para acumular puntos
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Shopping;