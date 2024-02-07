import PageHeading from '@/components/admin/PageHeading';
import ProductTable from '@/components/admin/ProductTable';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa6';
import { getProducts } from './action';
export default async function Products({ searchParams }) {
  const PRODUCTS_PER_PAGE = 2;
  const { page = '1' } = searchParams;
  if (isNaN(+page)) return redirect('/404');
  let products = await getProducts(+page, PRODUCTS_PER_PAGE);
  products = JSON.parse(products);
  let hasMore = true;
  if (products.length < PRODUCTS_PER_PAGE) hasMore = false;
  else hasMore = true;
  return (
    <div className="flex flex-col gap-6 items-start pb-36">
      <PageHeading label="Products" />
      <Link
        href="/admin/products/add"
        className="bg-black rounded-sm px-4 py-2 text-white flex gap-2 items-center"
      >
        <span>Add Products</span>
        <FaPlus />
      </Link>
      <ProductTable
        products={products}
        currentPageNo={+page}
        hasMore={hasMore}
      />
    </div>
  );
}
