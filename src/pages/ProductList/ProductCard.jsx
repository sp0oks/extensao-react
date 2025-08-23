import { useState } from 'react';
import axios from 'axios';

import Button from '../../components/Button';

import '../../styles/ProductCard.css';

export default function ProductCard({ product, onSave, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState(product);

    const handleEdit = () => setIsEditing(true);
    
    const handleCancel = () => {
        setEditedProduct(product);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        try {
            console.log('Deleting product:', product);
            await axios.delete(`${process.env.REACT_APP_API_URL}/${product.code}`);
            onDelete(product.code);
            setIsEditing(false);
        } catch (error) {
            console.log(`Erro ao deletar produto: ${error}`);
            alert("Não foi possível deletar o produto.");
        }
    };

    const handleSave = async () => {
        try {
            console.log('Saving product:', editedProduct);
            await axios.put(`${process.env.REACT_APP_API_URL}/${editedProduct.code}`, editedProduct);
            onSave(editedProduct);
            setIsEditing(false);
        } catch (error) {
            console.log(`Erro ao salvar produto: ${error}`);
            alert("Não foi possível salvar as alterações.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const processedValue = name === 'price' ? parseFloat(value) || 0 : value;

        setEditedProduct(prev => ({ ...prev, [name]: processedValue }));
    };

    return (
        <div className='product-card'>
            <div className='product-image-container'>
                <img src={product.pictureUrl} alt={product.category} className='product-image'/>
            </div>

            {isEditing ? (
                <>
                    <div className='product-details-edit'>
                        <input 
                            type="text" 
                            name="name" 
                            value={editedProduct.name} 
                            onChange={handleChange} 
                            className="product-input-title"
                        />
                        <input 
                            type="text" 
                            name="category" 
                            value={editedProduct.category} 
                            onChange={handleChange} 
                            className="product-input"
                        />
                        <input 
                            type="number" 
                            name="price" 
                            value={editedProduct.price} 
                            onChange={handleChange} 
                            className="product-input"
                        />
                        <textarea 
                            name="description" 
                            value={editedProduct.description} 
                            onChange={handleChange} 
                            className="product-textarea"
                        />
                    </div>
                    <div className='product-actions'>
                        <Button type='save-button' text='Salvar' action={handleSave} />
                        <Button type='cancel-button' text='Cancelar' action={handleCancel} />
                    </div>
                </>
            ) : (
                <>
                    <div className='product-details'>
                        <h2 className='product-title'>({product.code}) {product.name}</h2>
                        <p className='product-category'>{product.category}</p>
                        <p className='product-price'>R$ {Number(product.price).toFixed(2).replace('.', ',')}</p>
                        <p className='product-description'>{product.description}</p>
                    </div>
                    <div className='product-actions'>
                        <Button type='edit-button' text='Editar' action={handleEdit} />
                        <Button type='delete-button' text='Excluir' action={handleDelete} />
                    </div>
                </>
            )}
        </div>
    );
}