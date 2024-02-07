import PageHeading from '@/components/admin/PageHeading';
import ProductForm from '@/components/admin/ProductForm';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

export default function AddProducts() {
  return (
    <div className="flex flex-col items-start gap-10">
      <Link
        href="/admin/products"
        className="bg-black rounded-sm px-4 py-2 text-white flex gap-2 items-center"
      >
        <MdArrowBack />
        <span>Back</span>
      </Link>
      <PageHeading label="Add products to inventory" />
      <ProductForm />
    </div>
  );
}
