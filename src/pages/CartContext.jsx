import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Cargar datos del usuario al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  const savePurchase = () => {
    if (!user) return;
    
    const newPurchases = cart.map(item => ({
      containerId: item.id,
      date: new Date().toISOString().split('T')[0]
    }));
    
    const updatedUser = {
      ...user,
      purchases: [...user.purchases, ...newPurchases]
    };
    
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, user, addToCart, login, savePurchase }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);