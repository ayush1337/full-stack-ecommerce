import Link from 'next/link';
import Image from 'next/image';
import AddToCartBtn from './AddToCartBtn';
const ProductItem = ({ product }) => {
  return (
    <div className="flex flex-col gap-2">
      <figure className="relative">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={2000}
            height={2000}
            className="object-cover w-full"
          ></Image>
        </Link>
        <AddToCartBtn product={product} />
      </figure>
      <div className="font-extralight text-xs flex flex-col gap-1">
        <Link href={`/product/${product.slug}`}>
          <h2 className="hover:underline">{product.name}</h2>
        </Link>
        <span className="text-xs">
          {new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
          }).format(product.price)}
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
