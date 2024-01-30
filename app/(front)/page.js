import ProductItem from '@/components/products/ProductItem';
import data from '@/lib/data';
export default function Home() {
  return (
    <div className=" lg:p-36 p-4 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid">
      {data.products.map((product) => (
        <ProductItem key={product.slug} product={product} />
      ))}
    </div>
  );
}
