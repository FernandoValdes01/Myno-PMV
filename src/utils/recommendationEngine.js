export const getRecommendations = (users, containers, currentUserId = null) => {
  // Si no hay usuario logueado, mostrar los más populares
  if (!currentUserId) {
    return getPopularProducts(users, containers);
  }

  const user = users.find(u => u.id === currentUserId);
  
  // Si no hay usuario o no tiene compras, mostrar populares
  if (!user || !user.purchases?.length) {
    return getPopularProducts(users, containers);
  }

  // Obtener las compras recientes (últimas 3)
  const recentPurchases = user.purchases
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Calcular peso de cada producto (considerando cantidad comprada)
  const productWeights = recentPurchases.flatMap(purchase => 
  purchase.items.map(item => ({
    id: item.id,
    weight: item.quantity * (1 / (1 + Math.abs(new Date() - new Date(purchase.date)) / (1000 * 60 * 60 * 24)))
  }))
).reduce((acc, {id, weight}) => {
  acc[id] = (acc[id] || 0) + weight;
  return acc;
}, {});

  // Obtener categorías y tags más frecuentes
  const categoryCounts = recentPurchases.flatMap(purchase => 
    purchase.items.flatMap(item => item.category ? [item.category] : [])
  ).reduce((acc, category) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const tagCounts = recentPurchases.flatMap(purchase => 
    purchase.items.flatMap(item => item.tags || [])
  ).reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});

  // Calcular score para cada producto
  const scoredProducts = containers.map(product => {
    const purchaseScore = productWeights[product.id] || 0;
    const categoryScore = product.category ? (categoryCounts[product.category] || 0) * 2 : 0;
    const tagScore = product.tags ? product.tags.reduce((sum, tag) => sum + (tagCounts[tag] || 0), 0) : 0;
    
    return {
      ...product,
      score: purchaseScore * 0.6 + categoryScore * 0.3 + tagScore * 0.1
    };
  });

  // Ordenar por score y luego por popularidad global
  return scoredProducts.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return getProductPopularity(users, b.id) - getProductPopularity(users, a.id);
  });
};

// Función auxiliar para obtener productos populares
const getPopularProducts = (users, containers) => {
  return [...containers].sort((a, b) => {
    const aPopularity = getProductPopularity(users, a.id);
    const bPopularity = getProductPopularity(users, b.id);
    return bPopularity - aPopularity;
  });
};

// Función auxiliar para calcular popularidad global
const getProductPopularity = (users, productId) => {
  return users.reduce((total, user) => {
    return total + (user.purchases?.reduce((sum, purchase) => {
      return sum + (purchase.items.some(item => item.id === productId) ? 1 : 0);
    }, 0) || 0);
  }, 0);
};