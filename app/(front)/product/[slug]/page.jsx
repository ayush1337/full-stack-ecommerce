import data from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

const ProductDetails = ({ params }) => {
  const product = data.products.find((product) => product.slug === params.slug);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="mx-auto w-full grid lg:grid-cols-3 grid-flow-dense gap-6 lg:px-24 px-2 text-xs md:text-base font-thin">
      {/* Composition, Care & Origin starts   */}
      <div className="flex flex-col gap-8 md:row-start-1 row-start-3 border border-black self-center p-4 text-xs font-light">
        <h3>COMPOSITION, CARE & ORIGIN</h3>
        <span>
          We work with monitoring programmes to ensure compliance with our
          social, environmental and health and safety standards for our
          products. To assess compliance, we have developed a programme of
          audits and continuous improvement plans.
        </span>
        <h3 className="font-normal">Made in {product.origin}</h3>
      </div>
      {/* Composition, Care & Origin ends   */}

      {/* Product Image Starts   */}
      <Image
        src={product.image}
        width={1000}
        height={750}
        alt={product.name}
      ></Image>
      {/* Product Image Engs   */}

      {/* Product Detail Starts   */}

      <div className="flex flex-col border border-black self-start ">
        <div className="border-b border-black p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1>{product.name}</h1>
            <span>
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
              }).format(product.price)}
            </span>
            <span className="text-xs">MRP incl. of all taxes</span>
          </div>
          <span className="uppercase">{`Zara ${product.gender} Collection`}</span>
          <div>{product.description}</div>
        </div>
        <div className="border-b border-black p-6 flex flex-col gap-4">
          <span className="text-xs">{`BLACK | (2110 / 775)`}</span>
          <div className="grid grid-cols-2 gap-4">
            {product?.sizes?.map((size) => {
              return (
                <button className="uppercase border border-black font-extralight p-2 hover:bg-gray-200">
                  {size}
                </button>
              );
            })}
          </div>
        </div>
        <button className="py-4 uppercase flex items-center justify-center font-normal hover:text-gray-400">
          Add to cart
        </button>
      </div>

      {/* Product Detail Ends   */}
    </div>
  );
};

export default ProductDetails;
