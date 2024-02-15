'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import DateComponent from '@/components/DateComponent';

export default function OrderTable({
  orders = [],
  currentPageNo,
  hasMore,
  showPageNavigator = true,
}) {
  const router = useRouter();
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(() => true);
  }, []);
  const handleOnPrevPress = () => {
    const prevPage = currentPageNo - 1;
    if (prevPage > 0) router.push(`/admin/orders?page=${prevPage}`);
  };

  const handleOnNextPress = () => {
    const nextPage = currentPageNo + 1;
    router.push(`/admin/orders?page=${nextPage}`);
  };
  const deliveryStatus = [
    {
      label: 'ordered',
      value: 'ordered',
    },
    {
      label: 'shipped',
      value: 'shipped',
    },
    {
      label: 'delivered',
      value: 'delivered',
    },
  ];
  if (!mount) return <></>;
  return (
    <div className="flex flex-col w-full items-center gap-6">
      {orders.map((order) => {
        return (
          <div
            key={order._id}
            className="border border-black w-full p-8 border-opacity-15 flex flex-col gap-4"
          >
            <div className="flex lg:flex-row flex-col gap-12">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex gap-4 items-center flex-col text-xs lg:text-base lg:flex-row">
                  <h1 className="uppercase text-sm bg-[#ffe800] px-2 font-medium bg-opacity-45">
                    {order.paymentStatus}
                  </h1>
                  <h1 className="uppercase text-sm bg-blue-200 px-2 font-medium bg-opacity-45">
                    Delivery Status: {order.deliveryStatus}
                  </h1>
                  <DateComponent createdAt={order.createdAt} />
                </div>
                <span>{order.shippingDetails.name}</span>
                <span>{order.shippingDetails.email}</span>
                <span className="text-xs flex flex-col">
                  <span>{order.shippingDetails.address?.line1}</span>
                  <span>{order.shippingDetails.address?.line2}</span>
                  <span>
                    {order.shippingDetails.address?.city} -{' '}
                    {order.shippingDetails.address?.postal_code}{' '}
                    {order.shippingDetails.address?.state}
                  </span>
                </span>
              </div>
              <div className="ml-auto flex text-xs lg:text-base flex-col gap-2">
                <div className="self-start bg-black text-white px-4 py-2 font-light">
                  Total Amount:{' '}
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  }).format(order.totalAmount)}
                </div>
                <Select
                  options={deliveryStatus}
                  onChange={async ({ value }) => {
                    try {
                      const res = await fetch('/api/order/deliverystatus', {
                        method: 'POST',
                        body: JSON.stringify({
                          orderId: order._id,
                          deliveryStatus: value,
                        }),
                      });
                      if (res.ok) {
                        router.refresh();
                        toast.success('Order Status Updated');
                      }
                    } catch (error) {
                      toast.error('Order Status Update Failed');
                    }
                  }}
                  placeholder="Change Delivery Status"
                  disabled={true}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#00000023',
                      primary: 'black',
                    },
                  })}
                />
                <span className="text-xs capitalize">
                  Current Status: {order.deliveryStatus}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-12 pb-12">
              {order.orderItems.map((product) => {
                return (
                  <div key={product._id + product.size} className="">
                    <Image
                      src={product.image}
                      width={150}
                      height={350}
                      alt={product.productName}
                    ></Image>
                    <div className="flex flex-col gap-2">
                      <h1 className="uppercase font-medium">Product Details</h1>

                      <Link
                        href={`/product/${product.slug}/${product._id}`}
                        className="underline max-w-[200px] truncate text-sm"
                      >
                        {product.productName}
                      </Link>
                      <span className="uppercase text-xs">
                        Size: {product.size}
                      </span>
                      <span className="uppercase text-xs">
                        Quantity: {product.quantity}
                      </span>
                      <span className="uppercase text-xs">
                        Price:{' '}
                        {new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                        }).format(product.price)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

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
