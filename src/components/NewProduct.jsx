import { Form, useNavigate } from 'react-router-dom';
import '../styles/Form.css';
import '../styles/Button.css';

export default function NewProduct() {
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h2>Cadastrar Novo Produto</h2>
      <Form method="post">
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" name="name" required />
        </div>
        <div className="form-group">
          <label>Preço:</label>
          <input type="number" name="price" required />
        </div>
        <div className="form-group">
          <label>Categoria:</label>
          <input type="text" name="category" required />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea name="description" required />
        </div>
        <div className="form-buttons">
          <button type="submit" className="button create-button">Criar</button>
          <button type="button" className="button cancel-button" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </Form>
    </div>
  );
}