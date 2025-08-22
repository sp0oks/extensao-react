import Button from '../../components/Button';

import '../../styles/ProductCard.css';

export default function ProductCard({ product }) {
    return <> 
        <div className='product-card'>
            <div className='product-image-container'>
                <img src={product.pictureUrl} alt={product.category} className='product-image'/>
            </div>
            <div className='product-details'>
                <h2 className='product-title'>({product.code}) {product.name}</h2>
                <p className='product-category'>{product.category}</p>
                <p className='product-price'>R$ {Number(product.price).toFixed(2)}</p>
            </div>
            <div className='product-actions'>
                <Button type='edit-button' text='Editar' />
                <Button type='delete-button' text='Excluir' />
            </div>
        </div>
    </>
}