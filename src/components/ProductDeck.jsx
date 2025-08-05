import '../styles/ProductDeck.css';
import ProductCard from './ProductCard';

export default function ProductDeck({ products }) {
    if (products.length > 0) {
        return <div className="product-deck-container">
            {products.map(product => <ProductCard product={product} />)}
        </div>
    } else return <div className="product-deck-container">Nenhum produto encontrado.</div>
}