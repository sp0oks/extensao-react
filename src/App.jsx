import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './styles/App.css';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </button>
        <div className="logo-container">
          <Link to="/" className="app-logo">Catálogo de Produtos</Link>
        </div>
      </header>

      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={toggleMenu}>Lista de Produtos</Link>
            </li>
            <li>
              <Link to="/produtos/novo" onClick={toggleMenu}>Novo Produto</Link>
            </li>
          </ul>
        </nav>
      </div>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}