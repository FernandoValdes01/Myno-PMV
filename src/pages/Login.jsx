import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "./CartContext";
import { login } from '../utils/backend';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: contextLogin } = useCart();
  const navigate = useNavigate();

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
    </div>
  );
};

export default Login;