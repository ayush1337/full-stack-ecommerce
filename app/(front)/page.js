import SkeletonLoading from '@/components/SkeletonLoading';
import { getProductsFilter } from './guest_actions';
import Filter from '@/components/products/Filter';
import Products from '@/components/products/Products';

export default async function Home({ searchParams }) {
  try {
    const PRODUCTS_PER_PAGE = 4;

    const { page = 1, gender, size, category, sort } = searchParams;
    if (isNaN(+page)) return redirect('/404');

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
    const query = {
      pageNo: page,
      perPage: PRODUCTS_PER_PAGE,
      gender: gender ? gender : 'all',
      categoryArray,
      sizeArray,
      sortObject,
    };

    const products = JSON.parse(await getProductsFilter(query));
    let hasMore = true;
    if (products.length < PRODUCTS_PER_PAGE) hasMore = false;
    else hasMore = true;
    return (
      <div className="lg:p-36 p-4 flex flex-col gap-12 w-full">
        <Filter urlPath="/" />
        <Products products={products} hasMore={hasMore} currentPageNo={page} />
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>Cant Fetch Products</div>;
  }
}
