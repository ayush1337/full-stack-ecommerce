import { auth } from '@/auth';
import UserMenu from '@/components/user/UserMenu';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';
import Image from 'next/image';
import Link from 'next/link';
const fetchOrder = async () => {
  try {
    const session = await auth();

    if (!session?.user) return new Error('User Not Found');

    await dbConnect();

    const orders = await OrderModel.find({
      userId: session.user.id,
    }).sort('-createdAt');
    return JSON.stringify(orders);
  } catch (error) {
    return new Error('Something Went wrong');
  }
};
const UserOrder = async () => {
  try {
    const orders = JSON.parse(await fetchOrder());

    const DateComponent = ({ createdAt }) => {
      // Convert MongoDB created_at date string to JavaScript Date object
      const date = new Date(createdAt);

      // Format the date to a human-readable string
      const formattedDate = date.toLocaleString();

      return <h1 className="ml-auto">Order Date: {formattedDate}</h1>;
    };

    return (
      <div className="flex flex-col gap-12">
        <UserMenu active="order" />
        {orders.length === 0 && <h1>Oopss.... nothing ordered yet</h1>}
        {orders.map((order) => {
          return (
            <div
              key={order._id}
              className="w-full border border-black flex flex-col gap-12  p-4  border-opacity-20"
            >
              <div className="flex gap-4 items-start flex-col text-xs lg:text-base lg:flex-row">
                <h1 className="uppercase text-sm bg-[#ffe800] px-2 font-medium bg-opacity-45">
                  {order.paymentStatus}
                </h1>
                <h1 className="uppercase text-sm bg-blue-200 px-2 font-medium bg-opacity-45">
                  Delivery Status: {order.deliveryStatus}
                </h1>
                <DateComponent createdAt={order.createdAt} />
              </div>
              <div className="flex flex-wrap gap-12 pb-12 justify-between">
                {order.orderItems.map((product) => {
                  return (
                    <div key={product._id} className="">
                      <Image
                        src={product.image}
                        width={150}
                        height={350}
                        alt={product.productName}
                      ></Image>
                      <div className="flex flex-col gap-2">
                        <h1 className="uppercase font-medium">
                          Product Details
                        </h1>

                        <Link
                          href={`/product/${product.slug}/${product._id}`}
                          className="underline max-w-[200px] truncate"
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
                <div className="flex flex-col gap-2">
                  <h1 className="uppercase font-medium">Ordered By</h1>
                  <span className="text-sm">{order.shippingDetails.name}</span>
                  <span className="text-sm">{order.shippingDetails.email}</span>
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
                <div className="ml-auto self-end bg-black text-white px-4 py-2 font-light">
                  Total Amount:{' '}
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  }).format(order.totalAmount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } catch (error) {
    <div>Oopsss.. something went wrong</div>;
  }
};

export default UserOrder;
