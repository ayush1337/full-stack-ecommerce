'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as yup from 'yup';

import errorIco from '@/assets/error.svg';

import { signIn } from 'next-auth/react';
import { filterFormikErros } from '@/lib/utils/formikHelper';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Email is Requried'),
  password: yup.string().required('Password is Required'),
});

const LogInForm = () => {
  const [formErrors, setFormErrors] = useState([]);
  const router = useRouter();
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const signInRes = await signIn('credentials', {
        ...values,
        redirect: false,
      });
      if (signInRes?.error === 'CredentialsSignin') {
        toast.error('Email/Password Mismatch');
      }
      if (!signInRes?.error) {
        router.refresh();
      }
    },
  });

  useEffect(() => {
    setFormErrors(() => filterFormikErros(errors, touched));
  }, [errors, touched]);

  const { email, password } = values;

  const error = (name) => {
    return errors[name] && touched[name] ? true : false;
  };
  return (
    <div className="flex flex-col gap-12">
      <h1 className="uppercase">LOG IN TO YOUR ACCOUNT</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="relative ">
          <input
            type="text"
            id="email"
            className="input"
            required
            onChange={handleChange}
            value={email}
            onBlur={handleBlur}
          />
          <label htmlFor="email" className="label">
            Email
          </label>
        </div>
        <div className="relative">
          <input
            type="password"
            id="password"
            className="input"
            required
            onChange={handleChange}
            value={password}
            onBlur={handleBlur}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
        </div>
        <button
          type="submit"
          className="border border-black py-4 uppercase hover:text-gray-400"
        >
          Log In
        </button>
      </form>

      {Array.isArray(formErrors) && (
        <div className="flex flex-col text-xs gap-2 text-red-500">
          {formErrors.map((error) => {
            return (
              <span className="flex gap-1" key={error}>
                <Image
                  src={errorIco}
                  width={16}
                  height={16}
                  className="fill-red-500"
                  alt="error"
                ></Image>
                {error}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LogInForm;
