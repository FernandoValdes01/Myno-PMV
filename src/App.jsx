import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useCart } from "./pages/CartContext";
import Home from "./pages/Home";
import User from "./pages/User";
import Shopping from "./pages/Shopping";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useCart();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={
          <PrivateRoute>
            <User />
          </PrivateRoute>
        } />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      
      <footer className="global-footer">
        <div className="footer-links">
          <Link to="/contact">Contacto</Link>
          <span> | </span>
          <Link to="/about">Sobre Nosotros</Link>
        </div>
        <p className="footer-text">© 2025 MYNO STORE - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default App;