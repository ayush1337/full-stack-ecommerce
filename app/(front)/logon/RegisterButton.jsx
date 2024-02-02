'use client';
import { useRouter } from 'next/navigation';
const RegisterButton = () => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="uppercase">NEED AN ACCOUNT?</h1>
      <button
        className="border border-black py-4 uppercase hover:text-gray-400"
        onClick={() => router.push('/signup')}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterButton;
