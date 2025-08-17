import ProductAction from './ProductAction';

import '../../styles/ProductCard.css';

export default function ProductCard({ product }) {
    return <> 
        <div class='product-card'>
            <div class='product-image-container'>
                <img src={product.pictureUrl} alt={product.category} class='product-image'/>
            </div>
            <div class='product-details'>
                <h2 class='product-title'>{product.name}</h2>
                <p class='product-category'>{product.category}</p>
                <p class='product-price'>R$ {Number(product.price).toFixed(2)}</p>
            </div>
            <div class='product-actions'>
                <ProductAction type='edit-button' text='Editar' />
                <ProductAction type='delete-button' text='Excluir' />
            </div>
        </div>
    </>
}