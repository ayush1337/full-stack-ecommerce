import PageHeading from '@/components/admin/PageHeading';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import { getSingleProduct } from '../../action';
import UpdateProductForm from '@/components/admin/UpdateProductForm';

export default async function UpdateProduct({ params }) {
  let product;
  try {
    product = JSON.parse(await getSingleProduct(params.product_id));
  } catch (error) {
    return (
      <h1 className="text-center uppercase text-4xl font-light">
        Product not found
      </h1>
    );
  }

  return (
    <>
      {product?._id ? (
        <div className="flex flex-col items-start gap-10">
          <Link
            href="/admin/products"
            className="bg-black rounded-sm px-4 py-2 text-white flex gap-2 items-center"
          >
            <MdArrowBack />
            <span>Back</span>
          </Link>
          <PageHeading label="Update Product" />
          <UpdateProductForm product={product} />
        </div>
      ) : (
        <h1 className="text-center uppercase text-4xl font-light">
          Product not found
        </h1>
      )}
    </>
  );
}
