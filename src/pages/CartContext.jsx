import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [purchaseUpdate, setPurchaseUpdate] = useState(0); // Estado para trigger de actualización

  // Cargar datos del usuario y carrito al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedCart = localStorage.getItem('cartItems');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem('currentUser');
      }
    }
    
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
        localStorage.removeItem('cartItems');
      }
    }
  }, []);

  // Persistir carrito
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const login = (userData) => {
    const userWithPurchases = {
      ...userData,
      purchases: userData.purchases || []
    };
    setUser(userWithPurchases);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userWithPurchases));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      
      if (existing) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const savePurchase = async () => {
    if (!user || cartItems.length === 0) return null;
    
    const purchaseDetails = {
      date: new Date().toISOString(),
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    const updatedUser = {
      ...user,
      purchases: [...(user.purchases || []), purchaseDetails]
    };
    
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setPurchaseUpdate(prev => prev + 1); // Disparar actualización
    
    return purchaseDetails;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      user,
      isAuthenticated,
      purchaseUpdate,
      login,
      logout,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      savePurchase,
      cartTotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      itemCount: cartItems.reduce((count, item) => count + item.quantity, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};