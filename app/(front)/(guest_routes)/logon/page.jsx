import LogInForm from './LogInForm';
import RegisterButton from './RegisterButton';

const page = () => {
  return (
    <div className="w-full min-h-screen lg:px-24 px-6 grid lg:grid-cols-3 lg:gap-10 grid-cols-1 ">
      <LogInForm />
      <RegisterButton />
    </div>
  );
};

export default page;
