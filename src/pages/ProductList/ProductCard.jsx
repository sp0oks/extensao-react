import { useState } from 'react';

import apiClient from '../../api/apiClient';
import Button from '../../components/Button';
import ConfirmationModal from '../../components/ConfirmationModal';
import EditProductCard from './EditProductCard';

import '../../styles/ProductCard.css';

export default function ProductCard({ product, mode = 'view', onSave, onDelete, isSelected, onSelect }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState(product);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const confirmDelete = async () => {
        try {
            await apiClient.delete(`${process.env.REACT_APP_API_URL}/produtos/${product.code}`);
            onDelete(product.code);
        } catch (error) {
            console.error("Failed to delete product:", error);
            alert("Não foi possível excluir o produto.");
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => {
        setEditedProduct(product);
        setIsEditing(false);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        const processedValue = name === 'price' ? parseFloat(value) || 0 : value;

        setEditedProduct(prev => ({ ...prev, [name]: processedValue }));
    };
    const handleSave = async () => {
        try {
            console.log('Saving product:', editedProduct);
            await apiClient.put(
                `${process.env.REACT_APP_API_URL}/produtos/${editedProduct.code}`, editedProduct);
            onSave(editedProduct);
            setIsEditing(false);
        } catch (error) {
            console.log(`Erro ao salvar produto: ${error}`);
            alert("Não foi possível salvar as alterações.");
        }
    };

    return (
        <>
            <div className='product-card'>
            {isEditing ? (
                <EditProductCard
                    editedProduct={editedProduct}
                    onChange={handleChange}
                    onCancel={handleCancel}
                    onSave={handleSave}
                />
            ) : (
                <>
                    <div className='product-image-container'>
                        <img src={product.pictureUrl} alt={product.category} className='product-image'/>
                    </div>
                    <div className='product-details'>
                        <h2 className='product-title'>({product.code}) {product.name}</h2>
                        <p className='product-category'>{product.category}</p>
                        <p className='product-price'>R$ {Number(product.price).toFixed(2).replace('.', ',')}</p>
                        <p className='product-description'>{product.description}</p>
                    </div>
                    <div className='product-actions'>
                        {mode === 'preview' ? (
                            <div className="checkbox-container">
                                <label htmlFor={`checkbox-${product.id}`}>Incluir</label>
                                <input
                                    id={`checkbox-${product.id}`}
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => onSelect(product.id)}
                                />
                            </div>
                        ) : isEditing ? (
                            <>
                                <Button type='save-button' text='Salvar' action={handleSave} />
                                <Button type='cancel-button' text='Cancelar' action={handleCancel} />
                            </>
                        ) : (
                            <>
                                <Button type='edit-button' text='Editar' action={handleEdit} />
                                <Button type='delete-button' text='Excluir' action={() => setIsModalOpen(true)} />
                            </>
                        )}
                    </div>
                </>
                )}
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Confirmar Exclusão"
                message={`Tem certeza que deseja excluir o produto "${product.name}"?`}
            />
        </>
    );
}