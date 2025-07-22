import { useState } from 'react';
import './styles/ProductFilter.css';
import './styles/Button.css';

export default function ProductFilter({ onFilter }) {
  const [pendingSearchTerm, setPendingSearchTerm] = useState(''); // Estado para o input

  // Função para atualizar o estado do input enquanto o usuário digita
  const handlePendingSearchChange = (event) => {
    setPendingSearchTerm(event.target.value);
  };

  // Função chamada quando o botão "Filtrar" é clicado ou Enter é pressionado
  const handleFilterClick = () => {
    // Chama a função onFilter passada como prop, passando o termo de busca
    onFilter(pendingSearchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleFilterClick();
    }
  }

  return <div className="filter-controls">
      <input
        placeholder="Filtrar por código..."
        value={pendingSearchTerm}
        onChange={handlePendingSearchChange}
        onKeyPress={handleKeyPress}
        className="search-input"
      />
      <button onClick={handleFilterClick} className="button filter-button">
        Filtrar
      </button>
  </div>
}