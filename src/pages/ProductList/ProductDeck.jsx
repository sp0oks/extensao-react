import ProductCard from './ProductCard';

import '../../styles/ProductDeck.css';

export default function ProductDeck({ products, onSave, onDelete }) {
    if (products.length > 0) {
        return <div className='product-deck-container'>
            {products.map(product => (
                    <ProductCard
                        key={`product-${product.code}`}
                        product={product}
                        onSave={onSave}
                        onDelete={onDelete}
                    />
                )
            )}
        </div>
    } else return <div className='product-deck-container empty-deck'>Nenhum produto encontrado.</div>
}