import ProductItem from '@/components/products/ProductItem';
import { getProducts, getProductsFilter } from './guest_actions';
import Filter from '@/components/products/Filter';

export default async function Home({ searchParams }) {
  try {
    let products;
    function isEmpty(obj) {
      if (obj === null) return true;
      return Object.entries(obj).length === 0;
    }

    if (!isEmpty(searchParams)) {
      const { gender, size, category, sort } = searchParams;
      let sizeArray = [];
      let categoryArray = [];
      let sortObject = {};
      if (size) {
        sizeArray = size.split(',');
      }
      if (category) {
        categoryArray = category.split(',');
      }
      switch (sort) {
        case 'price_asc':
          sortObject = { price: 1 };
          break;
        case 'price_dsc':
          sortObject = { price: -1 };
          break;
        case 'product_asc':
          sortObject = { productName: 1 };
          break;
        case 'product_dsc':
          sortObject = { productName: -1 };
          break;
        default:
          sortObject = {
            createdAt: -1,
          };
          break;
      }
      products = JSON.parse(
        await getProductsFilter(gender, categoryArray, sizeArray, sortObject)
      );
    } else {
      products = JSON.parse(await getProducts());
    }

    return (
      <div className="lg:p-36 p-4 flex flex-col gap-12">
        <Filter urlPath="/" />
        <div className="  gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid">
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    <div>Can't Fetch Products</div>;
  }
}
