import React from 'react';

const SkeletonLoading = () => {
  return (
    <div className="grid grid-cols-8 gap-6 lg:px-32 px-4">
      {Array.from({ length: 16 }).map((_, index) => (
        <div key={index} className="w-32 h-64 bg-gray-300 bg-opacity-35"></div>
      ))}
    </div>
  );
};

export default SkeletonLoading;
