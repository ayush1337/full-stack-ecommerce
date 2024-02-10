import ProductItem from '@/components/products/ProductItem';
import { getProducts } from './guest_actions';

export default async function Home() {
  try {
    const products = JSON.parse(await getProducts());
    return (
      <div className=" lg:p-36 p-4 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    <div>Can't Fetch Products</div>;
  }
}
