import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';
import React from 'react';
import OrderTable from './OrderTable';

export default async function Orders({ searchParams }) {
  try {
    const fetchOrders = async (pageNo, perPage) => {
      const skip = (pageNo - 1) * perPage;
      await dbConnect();
      const orders = JSON.stringify(
        await OrderModel.find({}).sort('-createdAt').skip(skip).limit(perPage)
      );
      return orders;
    };

    const ORDERS_PER_PAGE = 4;
    const { page = '1' } = searchParams;
    if (isNaN(+page)) return redirect('/404');

    const orders = JSON.parse(await fetchOrders(+page, ORDERS_PER_PAGE));

    let hasMore = true;
    if (orders.length < ORDERS_PER_PAGE) hasMore = false;
    else hasMore = true;

    return (
      <div className="flex flex-col gap-6 items-start pb-32">
        <h1 className="text-xl tracking-normal uppercase font-thin">Orders</h1>
        <OrderTable orders={orders} currentPageNo={+page} hasMore={hasMore} />
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
