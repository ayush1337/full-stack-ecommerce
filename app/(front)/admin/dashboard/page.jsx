import OrderModel from '@/lib/models/OrderModel';
import React from 'react';
import PieChart from '@/components/PieChart';
import BarChart from '@/components/BarChart';
async function aggregateOrders() {
  try {
    const result = await OrderModel.aggregate([
      {
        $unwind: '$orderItems',
      },
      {
        $group: {
          _id: {
            gender: '$orderItems.gender',
            category: '$orderItems.category',
            size: '$orderItems.size',
          },
          total_orders: { $sum: 1 }, // Count total orders for each group
          total_amount: { $sum: '$totalAmount' }, // Sum total amount for each group
        },
      },
    ]).exec();

    return result;
  } catch (error) {
    console.error(error);
  }
}
export default async function Dashboard() {
  try {
    const ordersAggregate = await aggregateOrders();
    const total_orders = ordersAggregate?.reduce((val, { total_orders }) => {
      return (val += total_orders);
    }, 0);
    const total_amount = ordersAggregate?.reduce((val, { total_amount }) => {
      return (val += total_amount);
    }, 0);
    const totalGenders = {};
    const totalCategory = {};
    const totalSize = {};
    ordersAggregate.forEach((order) => {
      totalGenders[order._id.gender] = 0;
      totalCategory[order._id.category.label] = 0;
      totalSize[order._id.size] = 0;
    });
    ordersAggregate.forEach((order) => {
      totalGenders[order._id.gender] += order.total_orders;
      totalCategory[order._id.category.label] += order.total_orders;
      totalSize[order._id.size] += order.total_orders;
    });

    const genderData = {
      labels: Object.entries(totalGenders).map(([key]) => {
        return key;
      }),
      datasets: [
        {
          label: 'Sales Based on Gender',
          data: Object.entries(totalGenders).map(([key, value]) => {
            return value;
          }),
          backgroundColor: [
            'rgb(0, 0, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 194, 52)',
          ],
          hoverOffset: 4,
        },
      ],
    };

    const categoryData = {
      labels: Object.entries(totalCategory).map(([key]) => {
        return key;
      }),
      datasets: [
        {
          label: 'Sales Based on Category',
          data: Object.entries(totalCategory).map(([key, value]) => {
            return value;
          }),
          hoverOffset: 4,
        },
      ],
    };

    const sizeData = {
      labels: Object.entries(totalSize).map(([key]) => {
        return key;
      }),
      datasets: [
        {
          label: 'Sales Based on Size',
          data: Object.entries(totalSize).map(([key, value]) => {
            return value;
          }),
          backgroundColor: ['rgb(0, 0, 0)'],
          hoverOffset: 4,
        },
      ],
    };

    return (
      <div className="flex flex-col gap-12 items-start">
        <h1 className="text-xl tracking-normal uppercase font-thin">
          Dashboard
        </h1>
        <div className="flex flex-col lg:flex-row gap-4  text-xl xl:text-3xl">
          <h2 className="bg-black text-white px-6 py-3  font-light">
            Total Orders: {total_orders}
          </h2>
          <h2 className="bg-black bg-opacity-10 text-black px-6 py-3  font-light">
            Revenue:{' '}
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
            }).format(total_amount)}
          </h2>
        </div>
        <div className="flex xl:flex-row flex-col gap-12 items-center justify-between w-full pb-36 overflow-x-scroll">
          <PieChart data={genderData} />
          <PieChart data={categoryData} />
          <BarChart data={sizeData} />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
