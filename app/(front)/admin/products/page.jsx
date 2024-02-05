import PageHeading from '@/components/admin/PageHeading';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa6';
export default function Products() {
  return (
    <div className="flex flex-col gap-6 items-start">
      <PageHeading label="Products" />
      <Link
        href="/admin/products/add-products"
        className="bg-black rounded-sm px-4 py-2 text-white flex gap-2 items-center"
      >
        <span>Add Products</span>
        <FaPlus />
      </Link>
    </div>
  );
}
