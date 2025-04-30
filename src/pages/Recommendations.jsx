import { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { recommendContainer, getContainers } from '../utils/backend';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useCart();

  useEffect(() => {
    const loadRecommendations = async () => {
      if (user) {
        const recommended = recommendContainer();
        const allContainers = await getContainers();
        
        // Mezclar recomendaciones con productos aleatorios
        const otherProducts = allContainers
          .filter(p => p.id !== recommended?.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        
        setRecommendations([recommended, ...otherProducts].filter(Boolean));
      }
    };
    
    loadRecommendations();
  }, [user]);

  return (
    <div className="recommendations-section">
      <h2>Recomendaciones para ti</h2>
      <div className="recommendations-grid">
        {recommendations.map(item => (
          <div key={item.id} className="recommendation-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price.toLocaleString('es-CL')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;