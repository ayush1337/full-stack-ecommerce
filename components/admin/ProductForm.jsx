'use client';
import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { countries } from '@/lib/utils/country';
import { genders } from '@/lib/utils/gender';
import { FiUpload } from 'react-icons/fi';
import { useFormik } from 'formik';
import { filterFormikErros } from '@/lib/utils/formikHelper';
import errorIco from '@/assets/error.svg';
import Image from 'next/image';
import FormError from '../FormError';
import { MdDeleteOutline } from 'react-icons/md';
import {
  createCategory,
  createProduct,
  getAllCategory,
} from '@/app/(front)/admin/products/action';
import { capitalizeWords } from '@/lib/utils/capitalizeWords';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';
import AsyncSelect from 'react-select/async';
const ProductForm = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    value: 'IN',
    label: '🇮🇳 India',
  });
  const [gender, setGender] = useState('');

  const [stockInfo, setStockInfo] = useState({
    xs: 0,
    l: 0,
    m: 0,
    xxl: 0,
  });

  const [formErrors, setFormErrors] = useState([]);

  const [color, setColor] = useState('#00000');

  const [categoryToggle, setCategoryToggle] = useState(false);
  const [category, setCategory] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadImage, setUploadImage] = useState('');

  const [productUpload, setProductUpload] = useState(false);

  const fileField = useRef();
  const slugField = useRef();
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

  const validate = (values) => {
    const errors = {};
    if (!values.productName) errors.productName = 'Please enter product name.';
    if (!values.slug) errors.slug = 'Please enter/generate a slug.';
    if (values.price <= 0) errors.price = 'Please enter correct price.';
    if (!values.description)
      errors.description = 'Please enter short description.';
    if (!gender) errors.gender = 'Please select gender';
    if (stockIsZero()) errors.stock = 'Please have a product in stock';
    if (!uploadImage) errors.image = 'Please upload an image';
    if (!selectCategory) errors.category = 'Please select a category';
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
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        setProductUpload(() => true);
        values = {
          ...values,
          gender: gender?.value,
          stock: stockInfo,
          origin: selectedCountry,
          color: !color ? '#000000' : color,
          image: uploadImage,
          category: selectCategory,
          slug: values.slug.toLowerCase(),
        };
        const res = await createProduct(values);

        setProductUpload(() => false);
        toast.success(res.message);
        setTimeout(() => location.reload(), 2500);
      } catch (error) {
        toast.error(error.message);
        setProductUpload(() => false);
      }
    },
  });

  const sizes = ['xs', 'l', 'm', 'xxl'];
  function generateSlug(e) {
    if (e) {
      e.preventDefault();
    }
    const { productName } = values;
    if (!productName) return;
    let finalSlug = '';
    let productTitles = productName.split(' ');
    productTitles = productTitles.map((title) => title.toLowerCase());
    productTitles.forEach((title, idx) =>
      idx != productTitles.length - 1
        ? (finalSlug = finalSlug + title + '-')
        : (finalSlug = finalSlug + title)
    );
    slugField.current.value = finalSlug;
  }
  const resolveCategories = (inputValue) => {
    return new Promise(async (resolve) => {
      let categories = await getAllCategory(inputValue);

      categories = JSON.parse(categories);
      categories = JSON.parse(JSON.stringify(categories));
      const transformCategories = categories.map((category) => {
        return {
          label: category.categoryName,
          value: category._id.toString(),
        };
      });
      resolve(transformCategories);
    });
  };
  const error = (name) => {
    return errors[name] && touched[name] ? true : false;
  };

  async function handleUpload(e) {
    try {
      if (e) {
        e.preventDefault();
      }
      setUploading(() => true);
      let data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'citadel_upload');
      data.append('cloud_name', 'dt2newa4h');

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dt2newa4h/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );
      const imageURL = await res.json();
      setUploading(() => false);
      setUploadImage(() => imageURL.url);
    } catch (err) {
      console.log(err);
    }
  }

  const handleImageDelete = (e) => {
    if (e) {
      e.preventDefault();
    }
    setImage(() => '');
    setUploadImage(() => '');
    fileField.current.value = '';
  };

  useEffect(() => {
    setFormErrors(() => filterFormikErros(errors, touched));
  }, [errors, touched]);

  useEffect(() => {
    setMounted(() => true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div className="w-full lg:p-24 p-4 text-xs lg:text-base pb-36">
      {/* Loading Animation */}
      {productUpload && (
        <div className="w-full fixed h-full bg-white bg-opacity-75 z-20 top-0 left-0 flex flex-col gap-4 justify-center items-center ">
          <div className="flex flex-col gap-4 justify-center items-center bg-white border border-black px-8 py-4">
            <Spinner />
            <h1 className="capitalize tracking-tight text-2xl font-thin">
              Adding Product....
            </h1>
          </div>
        </div>
      )}
      {/* Product Form */}
      <form
        className="flex flex-col gap-16 lg:grid grid-cols-2 lg:gap-12 lg:items-start"
        onSubmit={handleSubmit}
      >
        <div className={`relative  ${error('productName') && 'form-error'}`}>
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
          className={`relative  flex xl:flex-row flex-col justify-start items-end gap-4 ${
            error('slug') && 'form-error'
          }`}
        >
          <input
            type="text"
            id="slug"
            name="slug"
            className="input"
            ref={slugField}
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="slug" className="label">
            Product Slug
          </label>
          <button
            onClick={generateSlug}
            className="px-4 py-2 rounded-sm bg-black text-white text-sm w-full"
          >
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
          className={`lg:grid grid-cols-2 gap-2 flex flex-col  relative ${
            categoryToggle ? 'items-end' : ''
          }`}
        >
          {categoryLoading && (
            <div className="w-full absolute h-full z-10 bg-white bg-opacity-85 flex flex-col items-center justify-center">
              <Spinner />
              <span>Creating Category</span>
            </div>
          )}

          {categoryToggle ? (
            <div className="relative">
              <input
                type="text"
                id="category"
                className="input "
                name="category"
                required
                onChange={(e) => setCategory(() => e.target.value)}
              />
              <label htmlFor="category" className="label">
                Category Name
              </label>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="uppercase font-thin text-xs">
                * Select a category
              </label>
              <AsyncSelect
                placeholder="Category"
                loadOptions={resolveCategories}
                cacheOptions
                defaultOptions
                isSearchable
                isClearable
                onChange={(selectedOption) => setSelectCategory(selectedOption)}
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
          )}
          {categoryToggle ? (
            <div className="flex flex-col text-sm gap-2">
              <button
                className="bg-black hover:bg-opacity-85 text-white py-2"
                onClick={async (e) => {
                  try {
                    e.preventDefault();
                    setCategoryLoading(() => true);
                    if (!category) return;
                    await createCategory({
                      categoryName: capitalizeWords(category),
                    });
                    setCategoryToggle(() => false);
                    setCategoryLoading(() => false);
                    toast.success('Category Created');
                  } catch (error) {
                    toast.error(
                      'Something went wrong, check for duplicate category'
                    );
                    setCategoryLoading(() => false);
                  }
                }}
              >
                Submit New Category
              </button>
              <button
                onClick={() => setCategoryToggle(() => false)}
                className="bg-gray-100 hover:bg-gray-200 py-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCategoryToggle(() => true)}
              className="bg-black text-white py-2 lg:self-end text-sm"
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
        <div className="flex flex-col items-start gap-4 relative">
          {uploading && (
            <div className="w-full h-full absolute left-0 top-0 bg-white bg-opacity-95 flex flex-col justify-center items-center gap-2">
              <Spinner />
              <span>Uploading Image...</span>
            </div>
          )}
          <span className="uppercase tracking-normal text-xs font-thin">
            * Select Product Image
          </span>
          <input
            type="file"
            className=" text-xs text-gray-500 
                                file:cursor-pointer file:mr-4 file:py-2 file:px-4
                                file:rounded-sm file:border-0
                                file:text-xs file:font-semibold
                              file:bg-black file:text-white
                                hover:file:bg-opacity-70"
            onChange={(e) => {
              setImage(() => e.target.files[0]);
            }}
            ref={fileField}
          />
          <button
            disabled={image ? false : true}
            onClick={handleUpload}
            className="disabled:cursor-not-allowed disabled:opacity-50 bg-black w-full text-white py-2 px-2 flex items-center justify-center gap-2 hover:bg-opacity-85"
          >
            <FiUpload />
            Upload product image
          </button>
        </div>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        ></input>
        {uploadImage && (
          <div className="relative">
            <Image
              src={uploadImage}
              width={350}
              height={500}
              alt="product image"
            ></Image>
            <button
              onClick={handleImageDelete}
              className="absolute top-0 right-0 bg-white bg-opacity-75 rounded-full p-2"
            >
              <MdDeleteOutline />
            </button>
          </div>
        )}
        <div className="col-span-2 flex justify-center ">
          <button
            type="submit"
            disabled={uploading ? true : false}
            className="bg-black text-white py-2 px-4 uppercase font-normal disabled:cursor-not-allowed disabled:opacity-65"
          >
            Submit Product
          </button>
        </div>
      </form>
      {/* Render Errors */}
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
