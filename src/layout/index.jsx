import { useState } from 'react';
import { Outlet, Link } from 'react-router';

import '../styles/Layout.css';

export default function Layout() {
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
          <Link to="/produtos" className="app-logo">Catálogo de Produtos</Link>
        </div>
      </header>

      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li>
              <Link to="/produtos" onClick={toggleMenu}>Lista de Produtos</Link>
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