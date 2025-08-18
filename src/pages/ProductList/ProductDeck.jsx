import ProductCard from './ProductCard';

import '../../styles/ProductDeck.css';

export default function ProductDeck({ products }) {
    if (products.length > 0) {
        return <div className='product-deck-container'>
            {products.map(product => <ProductCard key={`product-${product.id}`} product={product} />)}
        </div>
    } else return <div className='product-deck-container'>Nenhum produto encontrado.</div>
}