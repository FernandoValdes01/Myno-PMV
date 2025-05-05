import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "./CartContext";
import { login } from '../utils/backend';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: contextLogin } = useCart();
  const navigate = useNavigate();

  // Establecer valores predeterminados al cargar el componente
  useEffect(() => {
    setUsername('user1');
    setPassword('pass1');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      contextLogin(result.user);
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">INICIAR SESIÓN</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="buy-button">INGRESAR</button>
      </form>
      <button 
        className="secondary-button" 
        onClick={() => console.log('Registro futuro')}
        style={{ marginTop: '1rem' }}
      >
        REGISTRARSE
      </button>
      {/* Mensaje para el profesor */}
      <p style={{ 
        marginTop: '2rem',
        fontSize: '0.9rem',
        color: '#666',
        fontStyle: 'italic',
        textAlign: 'center'
      }}>
        Credenciales de prueba: user1 / pass1
      </p>
    </div>
  );
};

export default Login;