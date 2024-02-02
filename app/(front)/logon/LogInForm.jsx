'use client';
const LogInForm = () => {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="uppercase">LOG IN TO YOUR ACCOUNT</h1>
      <form className="flex flex-col gap-10">
        <div className="relative ">
          <input type="text" id="email" className="input" required />
          <label htmlFor="email" className="label">
            Email
          </label>
        </div>
        <div className="relative">
          <input type="password" id="password" className="input" required />
          <label htmlFor="password" className="label">
            Password
          </label>
        </div>
        <button className="border border-black py-4 uppercase hover:text-gray-400">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogInForm;
