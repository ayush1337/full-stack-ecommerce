'use client';
import ProductItem from '@/components/products/ProductItem';
import { useRouter } from 'next/navigation';
const Products = ({
  products,
  showPageNavigator = true,
  currentPageNo,
  hasMore,
}) => {
  const router = useRouter();

  const handleOnPrevPress = () => {
    const prevPage = Number(currentPageNo) - 1;
    if (prevPage > 0) router.push(`/?page=${prevPage}`);
  };

  const handleOnNextPress = () => {
    const nextPage = Number(currentPageNo) + 1;
    router.push(`/?page=${nextPage}`);
  };
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="  gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      {showPageNavigator ? (
        <div className="flex items-center gap-8">
          <button
            disabled={currentPageNo === 1}
            onClick={handleOnPrevPress}
            className="underline disabled:opacity-25 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            disabled={!hasMore}
            onClick={handleOnNextPress}
            className="bg-black px-4 py-1 text-white disabled:opacity-25 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Products;
