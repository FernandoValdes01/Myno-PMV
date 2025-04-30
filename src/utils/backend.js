let _data = null;

const loadData = async () => {
    if (!_data) {
      const response = await fetch('/data.json');
      _data = await response.json();
      
      // Agregar IDs a las imágenes basado en tu estructura
      _data.containers = _data.containers.map(container => ({
        ...container,
        image: `/src/assets/images/products/${container.image.split('/').pop()}`
      }));
    }
    return _data;
  };

export const login = async (username, password) => {
  const data = await loadData();
  const user = data.users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Guardar en localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, error: "Credenciales incorrectas" };
};

export const getContainers = async () => {
  const data = await loadData();
  return data.containers;
};

export const recommendContainer = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const data = JSON.parse(localStorage.getItem('appData') || {});
  
  // Recomendación simple: el más comprado por el usuario
  const purchasesCount = user.purchases.reduce((acc, purchase) => {
    acc[purchase.containerId] = (acc[purchase.containerId] || 0) + 1;
    return acc;
  }, {});

  const recommendedId = Object.entries(purchasesCount).sort((a, b) => b[1] - a[1])[0]?.[0];
  
  return data.containers.find(c => c.id === Number(recommendedId)) 
    || data.containers[0]; // Fallback al primero
};

export const savePurchase = (containerId) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const newPurchase = {
    containerId,
    date: new Date().toISOString().split('T')[0]
  };
  
  // Actualizar localStorage
  const updatedUser = {
    ...user,
    purchases: [...user.purchases, newPurchase]
  };
  
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  return { success: true };
};