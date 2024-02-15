'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { fetchCartData } from '@/lib/features/cartSlice';
export default function InitializeCartState() {
  const session = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    const initializeCart = () => {
      dispatch(fetchCartData(session.data.user.id.toString()));
    };
    if (session.status === 'authenticated') initializeCart();
  }, [session, dispatch]);
  return <></>;
}
