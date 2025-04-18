import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Shopping from "./pages/Shopping";
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      
      {/* Footer global  */}
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