import data from './data.json'
import ProductDeck from './ProductDeck';

export default function App() {
  return <>
    <ProductDeck products={data} />
  </>
}
