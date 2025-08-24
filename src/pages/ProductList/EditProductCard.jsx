import Button from '../../components/Button';

import '../../styles/ProductCard.css';

export default function EditProductCard({ editedProduct, onChange, onSave, onCancel }) {
    return (
        <>
            <div className='product-image-container-edit'>
                <textarea
                    name="pictureUrl"
                    value={editedProduct.pictureUrl}
                    onChange={onChange}
                    className="product-input-picture-url"
                />
            </div>
            <div className='product-details-edit'>
                <input 
                    type="text" 
                    name="name" 
                    value={editedProduct.name} 
                    onChange={onChange} 
                    className="product-input-title"
                />
                <input 
                    type="text" 
                    name="category" 
                    value={editedProduct.category} 
                    onChange={onChange} 
                    className="product-input"
                />
                <input 
                    type="number" 
                    name="price" 
                    value={editedProduct.price} 
                    onChange={onChange} 
                    className="product-input"
                />
                <textarea 
                    name="description" 
                    value={editedProduct.description} 
                    onChange={onChange} 
                    className="product-textarea"
                />
            </div>
            <div className='product-actions'>
                <Button type='save-button' text='Salvar' action={onSave} />
                <Button type='cancel-button' text='Cancelar' action={onCancel} />
            </div>
        </>
    )
}