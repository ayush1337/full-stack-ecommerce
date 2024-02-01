const CartDetails = () => {
  return (
    <div className="w-full bg-white flex  items-center  fixed bottom-0 z-20 right-0 border-y border-black">
      <div className="ml-auto  p-2 flex flex-col tracking-wider">
        <div className="font-bold text-xs">
          TOTAL
          <span>{'₹ 7,590.00'}</span>
        </div>
        <span className="opacity-75 text-[0.6rem] md:text-xs">
          INCLUDING GST
        </span>
        <span className="opacity-75 text-[0.6rem] md:text-xs">
          * EXCL SHIPPING COST
        </span>
      </div>
      <button className="p-8 bg-black text-white uppercase text-opacity-75">
        Continue
      </button>
    </div>
  );
};

export default CartDetails;
