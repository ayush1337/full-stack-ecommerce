'use client';
import React, { useState } from 'react';
import Select from 'react-select';
import { countries } from '@/lib/utils/country';
import { genders } from '@/lib/utils/gender';
const ProductForm = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    value: 'IN',
    label: '🇮🇳 India',
  });
  const [gender, setGender] = useState('');
  const [createCategory, setCreateCategory] = useState(false);
  return (
    <form className="grid grid-cols-2 gap-10 w-full items-end">
      <div className="relative">
        <input
          type="text"
          id="category-name"
          className="input "
          name="category-name"
          required
        />
        <label htmlFor="category-name" className="label">
          Product Name
        </label>
      </div>
      <div className="relative flex justify-start items-end gap-4">
        <input
          type="text"
          id="product-slug"
          className="input "
          name="product-slug"
          required
        />
        <label htmlFor="product-slug" className="label">
          Product Slug
        </label>
        <button className="px-4 py-2 rounded-sm bg-black text-white text-sm w-full">
          Generate Slug
        </button>
      </div>
      <div className="relative">
        <input
          type="number"
          id="product-price"
          className="input "
          name="product-price"
          min={0}
          required
        />
        <label htmlFor="product-price" className="label">
          Product Price
        </label>
      </div>
      <div className="relative">
        <input
          type="text"
          id="brand-name"
          className="input "
          name="brand-name"
          required
        />
        <label htmlFor="brand-name" className="label">
          Brand Name
        </label>
      </div>
      <div className="relative">
        <textarea
          type="text"
          id="product-description"
          className="input "
          name="product-description"
          required
        />
        <label htmlFor="product-description" className="label">
          Product description
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="select-country" className="uppercase text-xs">
          Select a country of origin
        </label>
        <Select
          options={countries}
          value={selectedCountry}
          onChange={(selectedOption) => setSelectedCountry(selectedOption)}
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
        <label htmlFor="select-country" className="uppercase text-xs">
          Select gender of garment
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
    </form>
  );
};

export default ProductForm;
