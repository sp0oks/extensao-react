import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';

import '../styles/Layout.css';

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const authenticate = async () => {
            try {
                if (localStorage.getItem('authToken')) {
                    return;
                }

                console.log('No token found, attempting to authenticate...');
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                    username: process.env.REACT_APP_API_USER,
                    password: process.env.REACT_APP_API_PASSWORD
                });

                const { token } = response.data;

                if (token) {
                    localStorage.setItem('authToken', token);
                    console.log('Authentication successful. Token stored.');
                } else {
                    throw new Error("Token not found in login response");
                }
            } catch (authError) {
                console.error('Authentication failed:', authError);
                setError('Failed to authenticate with the server.');
            } finally {
                setIsLoading(false);
            }
        };

        authenticate();
    }, []);

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
                {isLoading ? (
                    <div>Authenticating...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <Outlet />
                )}
            </main>
        </div>
    );
}