import ProductItem from '@/components/products/ProductItem';
import { getProducts } from './guest_actions';
import Filter from '@/components/products/Filter';

export default async function Home({ searchParams }) {
  function isEmpty(obj) {
    if (obj === null) return true;
    return Object.entries(obj).length === 0;
  }
  console.log(searchParams);
  try {
    let products;
    if (isEmpty(searchParams)) {
      products = JSON.parse(await getProducts());
    } else {
      products = [];
    }
    return (
      <div className="lg:p-36 p-4 flex flex-col gap-12">
        <Filter />
        <div className="  gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid">
          {products?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    <div>Can't Fetch Products</div>;
  }
}
