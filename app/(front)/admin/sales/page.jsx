import OrderModel from '@/lib/models/OrderModel';
import React from 'react';

const sevenDaySalesHistory = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const dateList = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo);
    date.setDate(date.getDate() + i);
    dateList.push(date.toISOString().split('T')[0]);
  }
  const lastSevenDaySales = await OrderModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: sevenDaysAgo,
        },
        paymentStatus: 'paid',
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
          },
        },
        totalAmount: { $sum: '$totalAmount' },
      },
    },
  ]);
  const sales = dateList.map((date) => {
    const matchedSale = lastSevenDaySales.find((sale) => {
      if (sale._id === date) {
        return sale;
      }
    });
    return {
      day: date,
      sale: matchedSale ? matchedSale.totalAmount : 0,
    };
  });
  lastSevenDaySales.reduce((val, { totalAmount }) => {
    return (val += totalAmount);
  }, 0);
  console.log(sales);
};
export default async function Sales() {
  await sevenDaySalesHistory();
  return (
    <div className="flex flex-col gap-6 items-start">
      <h1 className="text-xl tracking-normal uppercase font-thin">Sales</h1>
    </div>
  );
}
