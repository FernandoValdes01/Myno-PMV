let _data = null;

const loadData = async () => {
  if (!_data) {
    try {
      const response = await fetch('/data.json');
      _data = await response.json();
      
      // Actualizar URLs de imágenes para desarrollo local
      _data.containers = _data.containers.map(container => ({
        ...container,
        image: process.env.NODE_ENV === 'development' 
          ? container.image 
          : container.image.replace('/images', '')
      }));
      
    } catch (error) {
      console.error('Error loading data:', error);
      _data = { users: [], containers: [] };
    }
  }
  return _data;
};

export const login = async (username, password) => {
  const data = await loadData();
  const user = data.users.find(u => 
    u.username === username && u.password === password
  );
  
  if (user) {
    const userData = {
      ...user,
      purchases: user.purchases || []
    };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return { success: true, user: userData };
  }
  return { success: false, error: "Credenciales incorrectas" };
};

export const getContainers = async () => {
  const data = await loadData();
  return data.containers || [];
};

export const recommendContainer = async () => {
  try {
    const data = await loadData();
    const user = JSON.parse(localStorage.getItem('currentUser')) || { purchases: [] };
    
    // 1. Obtener categorías de productos comprados por el usuario
    const userPurchases = user.purchases || [];
    const userProductIds = userPurchases.map(p => p.containerId);
    
    const userProducts = data.containers.filter(p => 
      userProductIds.includes(p.id)
    );
    
    // 2. Encontrar categoría más frecuente
    const categoryCount = userProducts.reduce((acc, product) => {
      if (product?.category) {
        acc[product.category] = (acc[product.category] || 0) + 1;
      }
      return acc;
    }, {});

    const sortedCategories = Object.entries(categoryCount).sort((a, b) => b[1] - a[1]);
    const recommendedCategory = sortedCategories[0]?.[0];

    // 3. Buscar productos en la misma categoría no comprados antes
    if (recommendedCategory) {
      const candidates = data.containers.filter(
        p => p.category === recommendedCategory && 
             !userProductIds.includes(p.id) &&
             p.price // Asegurar que tenga precio
      );
      
      if (candidates.length > 0) {
        return candidates[Math.floor(Math.random() * candidates.length)];
      }
    }

    // 4. Fallback 1: Producto más comprado globalmente
    const allPurchases = data.users.flatMap(u => u.purchases || []);
    const globalCount = allPurchases.reduce((acc, purchase) => {
      acc[purchase.containerId] = (acc[purchase.containerId] || 0) + 1;
      return acc;
    }, {});

    const globalSorted = Object.entries(globalCount).sort((a, b) => b[1] - a[1]);
    const globalPopular = data.containers.find(
      p => p.id === Number(globalSorted[0]?.[0])
    );

    // 5. Fallback 2: Producto aleatorio con estructura válida
    const validProducts = data.containers.filter(
      p => p.id && p.name && p.price && p.image
    );

    return globalPopular || 
           validProducts[Math.floor(Math.random() * validProducts.length)] || 
           data.containers[0]; // Último fallback
  } catch (error) {
    console.error("Error in recommendContainer:", error);
    const data = await loadData();
    return data.containers[0]; // Retornar primer producto como fallback seguro
  }
};

export const savePurchase = async (containerIds) => {
  try {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return { success: false, error: "Usuario no autenticado" };

    const newPurchases = containerIds.map(id => ({
      containerId: id,
      date: new Date().toISOString().split('T')[0]
    }));
    
    const updatedUser = {
      ...user,
      purchases: [...(user.purchases || []), ...newPurchases]
    };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    return { success: true };
  } catch (error) {
    console.error("Error saving purchase:", error);
    return { success: false, error: "Error al guardar la compra" };
  }
};