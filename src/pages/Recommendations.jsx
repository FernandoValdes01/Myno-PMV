import { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { recommendContainer, getContainers } from '../utils/backend';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useCart();

  useEffect(() => {
    const loadRecommendations = async () => {
      if (user) {
        try {
          const recommended = await recommendContainer(); // Añadir await aquí
          const allContainers = await getContainers();
          
          // Validar que el producto recomendado tenga la estructura correcta
          const validRecommended = recommended && recommended.id 
            ? recommended 
            : allContainers[Math.floor(Math.random() * allContainers.length)];
          
          // Mezclar con productos aleatorios (asegurando estructura)
          const otherProducts = allContainers
            .filter(p => p.id !== validRecommended?.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .filter(p => p.price); // Solo productos con precio definido

          setRecommendations([validRecommended, ...otherProducts].filter(Boolean));
        } catch (error) {
          console.error("Error loading recommendations:", error);
        }
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
            <img src={item.image} alt={item.name} className="recommendation-image" />
            <div className="recommendation-details">
              <h3>{item.name}</h3>
              <p>${item.price?.toLocaleString('es-CL') || 'Precio no disponible'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;