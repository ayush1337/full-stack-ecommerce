'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { signIn } from 'next-auth/react';
import errorIco from '@/assets/error.svg';

import { filterFormikErros } from '@/lib/utils/formikHelper';
import { toast } from 'react-toastify';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid Email').required('Email is Requried'),
  password: yup.string().required('Password is required'),
});

const RegisterForm = () => {
  const [formErrors, setFormErrors] = useState([]);

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
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      const { message, error } = await res.json();
      if (res.ok) {
        toast.success(message);
        await signIn('credentials', { email, password });
      }
      if (!res.ok && error) {
        toast.error(error);
      }
    },
  });

  useEffect(() => {
    setFormErrors(() => filterFormikErros(errors, touched));
  }, [errors, touched]);

  const { name, email, password } = values;
  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 w-full lg:w-1/2 "
      >
        <div className="relative ">
          <input
            type="text"
            id="email"
            className="input"
            name="email"
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
            name="password"
            required
            onChange={handleChange}
            value={password}
            onBlur={handleBlur}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            id="name"
            className="input"
            name="name"
            required
            onChange={handleChange}
            value={name}
            onBlur={handleBlur}
          />
          <label htmlFor="name" className="label">
            Name
          </label>
        </div>
        <button
          type="submit"
          className="border border-black py-4 uppercase hover:text-gray-400"
        >
          Create an account
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

export default RegisterForm;
