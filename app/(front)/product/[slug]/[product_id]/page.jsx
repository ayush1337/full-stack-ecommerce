import { getSingleProduct } from '@/app/(front)/admin/products/action';
import { auth } from '@/auth';
import AddToCart from '@/components/products/AddToCart';
import ReviewForm from '@/components/products/ReviewForm';
import Image from 'next/image';
import Link from 'next/link';

const ProductDetails = async ({ params }) => {
  try {
    const product = JSON.parse(await getSingleProduct(params.product_id));
    const session = await auth();
    return (
      // <div>{product.productName}</div>
      <div className="mx-auto w-full grid lg:grid-cols-3 grid-flow-dense gap-6 lg:px-24 px-2 text-xs md:text-base font-thin ">
        {/* Composition, Care & Origin starts   */}
        <div className="flex flex-col gap-8 md:row-start-1 row-start-3 border border-black self-center p-4 text-xs font-light">
          <h3>COMPOSITION, CARE & ORIGIN</h3>
          <span>
            We work with monitoring programmes to ensure compliance with our
            social, environmental and health and safety standards for our
            products. To assess compliance, we have developed a programme of
            audits and continuous improvement plans.
          </span>
          <h3 className="font-normal">Made in {product.origin.label}</h3>
        </div>
        {/* Composition, Care & Origin ends   */}

        {/* Product Image Starts   */}
        <Image
          src={product.image}
          width={1000}
          height={750}
          alt={product.productName}
          priority={true}
        ></Image>
        {/* Product Image Engs   */}

        {/* Product Detail Starts   */}

        <div className="flex flex-col self-start text-sm">
          <div className="border border-black border-b-0 p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-medium">{product.productName}</h1>
              <span className="font-medium">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }).format(product.price)}
              </span>
              <span className="text-xs">MRP incl. of all taxes</span>
            </div>
            <Link
              href="#"
              className="uppercase text-xs underline"
            >{`Collection- ${product.category.label}`}</Link>

            <span className="uppercase">{`${product.brand} ${product.gender} Collection`}</span>
            <div>{product.description}</div>
          </div>

          <AddToCart product={product} sizeBorder={true} />
        </div>

        {/* Product Detail Ends   */}
        <ReviewForm productId={product._id} />
      </div>
    );
  } catch (error) {
    return <div>Product not found</div>;
  }
};

export default ProductDetails;
