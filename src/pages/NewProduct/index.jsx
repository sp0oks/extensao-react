import { Form, useNavigate } from 'react-router-dom';

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
          <label htmlFor='name'>Nome:</label>
          <input type='text' id='name' name='name' required />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Preço:</label>
          <input type='number' id='price' name='price' min='0' step='any' required />
        </div>
        <div className='form-group'>
          <label htmlFor='category'>Categoria:</label>
          <input type='text' id='category' name='category' required />
        </div>
        <div className='form-group'>
          <label htmlFor='pictureUrl'>Foto:</label>
          <input type='url' id='pictureUrl' name='pictureUrl' required />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Descrição:</label>
          <textarea id='description' name='description' required />
        </div>
        <div className='form-buttons'>
          <Button type='submit create-button' text='Criar' />
          <Button type='cancel-button' action={handleCancel} text='Cancelar' />
        </div>
      </Form>
    </div>
  );
}