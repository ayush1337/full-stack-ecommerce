'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function EmailVerificationBanner({ id, verified }) {
  const [submitting, setSubmitting] = useState(false);

  const applyForReverification = async () => {
    if (!id) return;

    setSubmitting(true);
    const res = await fetch('/api/auth/verify?userId=' + id, {
      method: 'GET',
    });
    const { message, error } = await res.json();
    if (!res.ok && error) {
      toast.error(error);
    }

    toast.success(message);
    setSubmitting(false);
  };

  if (verified) return null;

  return (
    <div className="p-2 text-center bg-gray-200 px-4 bg-opacity-35">
      <span>
        {submitting
          ? 'Please check your mail again'
          : `It seems you haven't verified your email.`}
      </span>
      <button
        disabled={submitting}
        onClick={applyForReverification}
        className="ml-2 font-semibold underline"
      >
        {submitting ? 'Link Generated.' : 'Get verification link.'}
      </button>
    </div>
  );
}
