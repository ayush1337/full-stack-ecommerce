'use client';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { countries } from '@/lib/utils/country';
import { genders } from '@/lib/utils/gender';
import { FiUpload } from 'react-icons/fi';
import { useFormik } from 'formik';
import { filterFormikErros } from '@/lib/utils/formikHelper';
import errorIco from '@/assets/error.svg';
import Image from 'next/image';
import FormError from '../FormError';
const ProductForm = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    value: 'IN',
    label: '🇮🇳 India',
  });
  const [gender, setGender] = useState('');
  const [createCategory, setCreateCategory] = useState(false);
  const [stockInfo, setStockInfo] = useState({
    xs: 0,
    l: 0,
    m: 0,
    xxl: 0,
  });
  const [formErrors, setFormErrors] = useState([]);
  const [color, setColor] = useState(null);
  console.log(color);
  const handleStockInfo = (e) => {
    let { name, value } = e.target;
    value = Number(value);
    if (value < 0) value = value * -1;
    setStockInfo((state) => {
      return {
        ...state,
        [name]: Number(value),
      };
    });
  };
  function stockIsZero() {
    let flag = true;
    for (const [key, value] of Object.entries(stockInfo)) {
      if (value > 0) flag = false;
    }
    return flag;
  }
  function sizeAvailable() {
    const sizes = [];
    for (const [key, value] of Object.entries(stockInfo)) {
      if (value > 0) sizes.push(key);
    }
    return sizes;
  }
  const validate = (values) => {
    const errors = {};
    if (!values.productName) errors.productName = 'Please enter product name.';
    if (!values.slug) errors.slug = 'Please enter/generate a slug.';
    if (values.price <= 0) errors.price = 'Please enter correct price.';
    if (!values.description)
      errors.description = 'Please enter short description.';
    if (!gender) errors.gender = 'Please select gender';
    if (stockIsZero()) errors.stock = 'Please have a product in stock';
    return errors;
  };
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
      productName: '',
      slug: '',
      price: 0,
      brand: 'zara',
      description: '',
      origin: selectedCountry,
    },
    validate,
    onSubmit: async (values) => {
      values = {
        ...values,
        gender: gender?.value,
        stock: stockInfo,
        sizes: sizeAvailable(),
        origin: selectedCountry,
        color: !color ? '#000' : color,
      };
      console.log(values);
    },
  });

  const sizes = ['xs', 'l', 'm', 'xxl'];
  useEffect(() => {
    setFormErrors(() => filterFormikErros(errors, touched));
  }, [errors, touched]);
  useEffect(() => {
    setMounted(() => true);
  });

  const error = (name) => {
    return errors[name] && touched[name] ? true : false;
  };

  if (!mounted) return <></>;

  return (
    <div className="w-full p-24">
      <form
        className="grid grid-cols-2 gap-12 w-full items-end"
        onSubmit={handleSubmit}
      >
        <div className={`relative ${error('productName') && 'form-error'}`}>
          <input
            type="text"
            id="productName"
            name="productName"
            className="input"
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="productName" className="label">
            Product Name
          </label>
          {error('productName') && <FormError label={errors['productName']} />}
        </div>
        <div
          className={`relative  flex justify-start items-end gap-4 ${
            error('slug') && 'form-error'
          }`}
        >
          <input
            type="text"
            id="slug"
            name="slug"
            className="input"
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="slug" className="label">
            Product Slug
          </label>
          <button className="px-4 py-2 rounded-sm bg-black text-white text-sm w-full">
            Generate Slug
          </button>
          {error('slug') && <FormError label={errors['slug']} />}
        </div>
        <div className={`relative ${error('price') && 'form-error'}`}>
          <input
            type="number"
            id="price"
            name="price"
            className="input"
            min={0}
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="price" className="label">
            Product Price
          </label>
          {error('price') && <FormError label={errors['price']} />}
        </div>
        <div className="relative">
          <input
            type="text"
            id="brand"
            name="brand"
            className="input"
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="brand" className="label">
            Brand Name
          </label>
        </div>
        <div className={`relative ${error('description') && 'form-error'}`}>
          <textarea
            type="text"
            id="description"
            name="description"
            className="input"
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="description" className="label">
            Product description
          </label>
          {error('description') && <FormError label={errors['description']} />}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="select-country"
            className="uppercase text-xs font-thin tracking-normal"
          >
            Select a country of origin
          </label>
          <Select
            options={countries}
            value={selectedCountry}
            onChange={(selectedOption) =>
              setSelectedCountry(() => {
                return {
                  ...selectedOption,
                };
              })
            }
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: '#00000023',
                primary: 'black',
              },
            })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="select-country"
            className="uppercase text-xs font-thin tracking-normal"
          >
            *Select gender of garment
          </label>
          <Select
            placeholder="Gender"
            options={genders}
            value={gender}
            onChange={(selectedOption) => setGender(selectedOption)}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: '#00000023',
                primary: 'black',
              },
            })}
          />
        </div>

        <div
          className={`grid grid-cols-2 gap-2 ${
            createCategory ? 'items-end' : ''
          }`}
        >
          {createCategory ? (
            <div className="relative">
              <input
                type="text"
                id="product-name"
                className="input "
                name="product-name"
                required
              />
              <label htmlFor="category-name" className="label">
                Category Name
              </label>
            </div>
          ) : (
            <Select
              placeholder="Category"
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: '#00000023',
                  primary: 'black',
                },
              })}
            />
          )}
          {createCategory ? (
            <div className="flex flex-col text-sm gap-2">
              <button className="bg-black hover:bg-opacity-85 text-white py-2">
                Submit New Category
              </button>
              <button
                onClick={() => setCreateCategory(() => false)}
                className="bg-gray-100 hover:bg-gray-200 py-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCreateCategory(() => true)}
              className="bg-black text-white"
            >
              Create New Category
            </button>
          )}
        </div>
        <div className="grid relative grid-cols-2 gap-5">
          <span className="col-span-2 uppercase font-thin tracking-normal">
            * Stock information
          </span>
          {sizes.map((size) => {
            return (
              <div key={size} className="flex flex-col gap-2">
                <label htmlFor={size} className="uppercase font-thin">
                  {size}
                </label>
                <input
                  type="number"
                  min={0}
                  defaultValue={0}
                  id={size}
                  name={size}
                  className="border border-gray-200 p-2"
                  onBlur={handleStockInfo}
                />
                {error('stock') && <FormError label={errors['stock']} />}
              </div>
            );
          })}
        </div>
        <button className="bg-black text-white self-center py-4 flex items-center justify-center gap-2">
          <FiUpload />
          Upload product image
        </button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        ></input>
        <div className="col-span-2 flex justify-center ">
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 uppercase font-normal"
            onClick={() => {}}
          >
            Submit Product
          </button>
        </div>
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

export default ProductForm;
