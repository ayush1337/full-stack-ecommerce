import ProductTable from '@/components/admin/ProductTable';
import { getProductsByQuery } from '../action';

export default async function SearchAdminProducts({ searchParams }) {
  try {
    const { query } = searchParams;
    const products = JSON.parse(await getProductsByQuery(query));
    return (
      <div>
        <ProductTable
          currentPageNo={0}
          showPageNavigator={false}
          products={products}
        />
      </div>
    );
  } catch (error) {
    return <div>Product Not Found!</div>;
  }
}
