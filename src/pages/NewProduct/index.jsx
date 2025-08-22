import { Form, useNavigate } from 'react-router';

import Button from '../../components/Button'

import '../../styles/Form.css';

export default function NewProduct() {
  const navigate = useNavigate();
  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/produtos');
  };

  return (
    <div className='form-container'>
      <h2>Cadastrar Novo Produto</h2>
      <Form action='/produtos' method='post'>
        <div className='form-group'>
          <label>Nome:</label>
          <input type='text' name='name' required />
        </div>
        <div className='form-group'>
          <label>Preço:</label>
          <input type='number'name='price' min='0' step='any' required />
        </div>
        <div className='form-group'>
          <label>Categoria:</label>
          <input type='text' name='category' required />
        </div>
        <div className='form-group'>
          <label>Foto:</label>
          <input type='url' name='picture-url' required />
        </div>
        <div className='form-group'>
          <label>Descrição:</label>
          <textarea name='description' required />
        </div>
        <div className='form-buttons'>
          <Button type='submit create-button' text='Criar' />
          <Button type='cancel-button' action={handleCancel} text='Cancelar' />
        </div>
      </Form>
    </div>
  );
}