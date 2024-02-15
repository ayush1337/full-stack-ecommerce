import ProductItem from '@/components/products/ProductItem';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';

export default async function Category({ params }) {
  try {
    const title = params.category_slug.split('%20').join(' ');
    const fetchProducts = async () => {
      try {
        await dbConnect();
        const products = JSON.stringify(
          await ProductModel.find({
            'category.value': params.category_id,
          })
        );

        return products;
      } catch (error) {
        throw new Error('Product Not Found');
      }
    };
    const products = JSON.parse(await fetchProducts());

    return (
      <div className="w-full min-h-screen lg:p-36 p-4 flex flex-col gap-12">
        <h1 className="text-5xl font-extralight uppercase">{title}</h1>
        <div className="gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid">
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="w-full min-h-screen lg:p-36 p-4">
        <h1 className="text-5xl font-extralight uppercase">
          Oppssss... Cant Find Products
        </h1>
      </div>
    );
  }
}
