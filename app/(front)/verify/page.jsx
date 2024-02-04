'use client';
import waitEmailIco from '@/assets/wait_email.svg';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
const page = (props) => {
  const { token, userId } = props.searchParams;
  if (!token || !userId) return notFound();
  const router = useRouter();
  useEffect(() => {
    fetch('/api/auth/verify', {
      method: 'POST',
      body: JSON.stringify({
        token,
        userId,
      }),
    }).then(async (res) => {
      const { error } = await res.json();
      if (res.ok) {
        toast.success('Email Verified Successfully', {
          toastId: 'success',
        });
      }
      if (!res.ok && error) {
        toast.error(error);
      }
      router.replace('/');
    });
  }, []);
  return (
    <div className="w-full flex flex-col gap-10 items-center">
      <h3>Hold up! we are verifying your mail.</h3>
      <Image
        src={waitEmailIco}
        width={350}
        height={350}
        alt="wait for verification"
      ></Image>
    </div>
  );
};

export default page;
