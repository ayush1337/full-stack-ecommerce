import RegisterForm from './RegisterForm';

const page = () => {
  return (
    <div className="w-full lg:px-36 min-h-screen flex flex-col gap-12 px-4">
      <h1>PERSONAL DETAILS</h1>
      <RegisterForm />
    </div>
  );
};

export default page;
