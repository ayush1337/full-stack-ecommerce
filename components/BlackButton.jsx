import React from 'react';

const BlackButton = ({ label }) => {
  return (
    <button className="px-4 py-2 rounded-sm bg-black text-white flex ">
      {label}
    </button>
  );
};

export default BlackButton;
