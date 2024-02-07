'use client';
import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import sorting from '@/assets/error.svg';
import download from '@/assets/error.svg';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Price from '../Price';
import { LiaEditSolid } from 'react-icons/lia';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';
import { updateProduct } from '@/app/(front)/admin/products/action';
export default function ProductTable({
  products = [],
  currentPageNo,
  hasMore,
  showPageNavigator = true,
}) {
  const [emptyStock, setEmptyStock] = useState(false);
  const router = useRouter();

  const handleOnPrevPress = () => {
    const prevPage = currentPageNo - 1;
    if (prevPage > 0) router.push(`/admin/products?page=${prevPage}`);
  };

  const handleOnNextPress = () => {
    const nextPage = currentPageNo + 1;
    router.push(`/admin/products?page=${nextPage}`);
  };
  return (
    <div className="flex flex-col w-full items-center gap-6">
      <div className="p-5 w-full bg-white shadow rounded flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm ">
          <div className="bg-white flex  items-center gap-2 border-gray-100 border-2 w-fit p-2 rounded-md ">
            <IoIosSearch />
            <input
              type="text"
              placeholder="Search Products"
              className="focus:outline-none placeholder:text-sm placeholder:font-light w-20 md:w-fit "
            />
          </div>

          <div className="cursor-pointer p-2 border-gray-100 border-2 flex gap-1 items-center ml-auto">
            <span>Sort</span>
            <img src={sorting} className="w-4" />
          </div>

          <div className="cursor-pointer p-2 border-gray-100 border-2">
            <img src={download} className="w-4" />
          </div>
        </div>
        <div className="overflow-auto">
          <table className="w-full">
            <thead className="bg-black text-white  ">
              <tr>
                <th className="p-3 text-sm   font-medium tracking-wide text-left">
                  Product
                </th>
                <th className="p-3 text-sm  font-medium tracking-wide text-left">
                  Name
                </th>
                <th className="p-3 text-sm  font-medium tracking-wide text-left">
                  Price
                </th>
                <th className=" p-3 text-sm font-medium tracking-wide text-left">
                  Category
                </th>
                <th className=" p-3 text-sm  font-medium tracking-wide text-left">
                  XS
                </th>
                <th className=" p-3 text-sm  font-medium tracking-wide text-left">
                  M
                </th>
                <th className=" p-3 text-sm  font-medium tracking-wide text-left">
                  L
                </th>
                <th className=" p-3 text-sm  font-medium tracking-wide text-left">
                  XXL
                </th>
                <th className=" p-3 text-sm  font-medium tracking-wide text-left">
                  Brand
                </th>
                <th className=" p-3 text-sm  font-medium tracking-wide text-left"></th>

                <th className=" p-3 text-sm  font-medium tracking-wide text-left"></th>
              </tr>
            </thead>

            <tbody className="divide-y bg-white p-4">
              {products.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>
                      <Image
                        src={product.image}
                        alt={product.productName}
                        width={150}
                        height={500}
                      ></Image>
                    </td>
                    <td>
                      <span className="inline-block lg:max-w-80  max-w-56 truncate ">
                        {product.productName}
                      </span>
                    </td>
                    <td>
                      <Price price={product.price} />
                    </td>
                    <td>{product.category.label}</td>
                    <td>{product.stock.xs}</td>
                    <td>{product.stock.m}</td>
                    <td>{product.stock.l}</td>
                    <td>{product.stock.xxl}</td>
                    <td>{product.brand}</td>
                    <td>
                      <button
                        onClick={() =>
                          router.push(`/admin/products/update/${product._id}`)
                        }
                        className="flex items-center  underline text-blue-500"
                      >
                        <LiaEditSolid />
                        <span>edit</span>
                      </button>
                    </td>
                    <td>
                      {emptyStock && (
                        <div className="flex items-center gap-1">
                          <Spinner />
                          <span>Emptying Stock...</span>
                        </div>
                      )}
                      {!emptyStock && (
                        <button
                          onClick={async (e) => {
                            try {
                              setEmptyStock(() => true);
                              if (e) {
                                e.preventDefault();
                              }
                              const res = await updateProduct({
                                ...product,
                                stock: {
                                  xs: 0,
                                  m: 0,
                                  l: 0,
                                  xxl: 0,
                                },
                                sizes: [],
                              });
                              toast.success(res.message);
                              setEmptyStock(() => false);
                            } catch (error) {
                              toast.error(error);
                              setEmptyStock(() => false);
                            }
                          }}
                          className="text-red-500 flex items-center underline "
                        >
                          <LiaEditSolid />
                          <span className="text-xs md:text-sm ">
                            update to out of stock
                          </span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {showPageNavigator ? (
        <div className="flex items-center gap-4">
          <button
            disabled={currentPageNo === 1}
            onClick={handleOnPrevPress}
            className="underline disabled:opacity-25 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            disabled={!hasMore}
            onClick={handleOnNextPress}
            className="bg-black px-4 py-1 text-white disabled:opacity-25 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
