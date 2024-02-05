import React from 'react';

const FormError = ({ label }) => {
  return (
    <span className="absolute left-0 -bottom-6 text-xs text-red-500">
      {label}
    </span>
  );
};

export default FormError;
