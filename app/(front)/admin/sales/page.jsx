import LineChart from '@/components/LineChart';
import OrderModel from '@/lib/models/OrderModel';
import React from 'react';
function formatDateWithShortDay(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: 'short',
  };
  return date.toLocaleDateString('en-US', options);
}
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
      day: formatDateWithShortDay(date),
      sale: matchedSale ? matchedSale.totalAmount : 0,
    };
  });
  lastSevenDaySales.reduce((val, { totalAmount }) => {
    return (val += totalAmount);
  }, 0);
  return sales;
};
export default async function Sales() {
  try {
    const sales = await sevenDaySalesHistory();
    const salesData = {
      labels: sales.map(({ day }) => {
        return day;
      }),
      datasets: [
        {
          label: 'Sales',
          data: sales.map(({ sale }) => {
            return sale;
          }),
          backgroundColor: ['rgb(0, 0, 0)'],
          hoverOffset: 4,
        },
      ],
    };
    return (
      <div className="flex flex-col gap-6 items-start">
        <h1 className="text-xl tracking-normal uppercase font-thin">Sales</h1>
        <LineChart data={salesData} />
      </div>
    );
  } catch (error) {}
}
