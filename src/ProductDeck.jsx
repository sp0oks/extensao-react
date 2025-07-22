import './styles/ProductDeck.css';
import ProductCard from './ProductCard';

export default function ProductDeck({ products }) {
    return <div className="product-deck-container">
        {products.map(product => <ProductCard product={product} />)}
    </div>
}