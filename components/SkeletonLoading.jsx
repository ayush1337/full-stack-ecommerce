import React from 'react';

const SkeletonLoading = () => {
  return (
    <div className="grid 2xl:grid-cols-8 md:grid-cols-4 gap-6 grid-cols-1 lg:px-32 px-4 place-items-center">
      {Array.from({ length: 16 }).map((_, index) => (
        <div key={index} className="w-32 h-64 bg-gray-300 bg-opacity-35"></div>
      ))}
    </div>
  );
};

export default SkeletonLoading;
