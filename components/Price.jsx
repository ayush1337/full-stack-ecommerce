import React from 'react';

export default function Price({ price }) {
  return (
    <>
      {new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(price)}
    </>
  );
}
