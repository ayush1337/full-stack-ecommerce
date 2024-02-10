'use client';
import Select from 'react-select';
import { BiSort } from 'react-icons/bi';
import AsyncSelect from 'react-select/async';

import { getAllCategory } from '@/app/(front)/admin/products/action';

import { sortOptions, sizeOptions } from '@/lib/utils/filters';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Filter() {
  const [mount, setMount] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [sortFilter, setSortFilter] = useState({});
  const router = useRouter();

  function isEmpty(obj) {
    if (obj === null) return true;
    return Object.entries(obj).length === 0;
  }
  useEffect(() => {
    setMount(() => true);
  }, []);

  useEffect(() => {
    if (categoryFilter.length || sizeFilter.length || !isEmpty(sortFilter)) {
      let query = '?';
      let categoryFound = false;
      let sizeFound = false;

      if (categoryFilter.length) {
        categoryFound = true;
        query += 'category=';
        categoryFilter.forEach((category, i) => {
          if (i) query += ',';
          query += category.label;
        });
      }

      if (sizeFilter.length) {
        sizeFound = true;
        if (categoryFound) {
          query += '&size=';
        } else {
          query += 'size=';
        }
        sizeFilter.forEach((size, i) => {
          if (i) query += ',';
          query += size.label;
        });
      }
      if (!isEmpty(sortFilter)) {
        if (categoryFound || sizeFound) {
          query += '&sort=';
        } else {
          query += 'sort=';
        }
        query += sortFilter.value;
      }
      router.push(query);
    } else {
      router.push('/');
    }
  }, [categoryFilter, sizeFilter, sortFilter]);

  const handleCategorySelect = (selectedOption) => {
    setCategoryFilter(() => selectedOption);
  };
  const handleSizeSelect = (selectedOption) => {
    setSizeFilter(() => selectedOption);
  };
  const handleSortSelect = (selectedOption) => {
    setSortFilter(() => selectedOption);
  };
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

  if (!mount) <></>;
  return (
    <div className="flex lg:items-center items-start gap-6 flex-col lg:flex-row lg:text-base text-sm">
      <button className="border border-black px-4 py-1 uppercase">Man</button>
      <button className="border border-black px-4 py-1 uppercase">Woman</button>
      <AsyncSelect
        placeholder="CATEGORY"
        cacheOptions
        defaultOptions
        loadOptions={resolveCategories}
        instanceId="category-select"
        onChange={handleCategorySelect}
        isMulti
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
      <Select
        placeholder="SIZE"
        options={sizeOptions}
        isMulti
        onChange={handleSizeSelect}
        instanceId="size-select"
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
      <div className="flex flex-row-reverse lg:flex-row items-center gap-2 lg:ml-auto">
        <BiSort className="opacity-85" />
        <Select
          placeholder="SORT PRODUCTS"
          options={sortOptions}
          onChange={handleSortSelect}
          isClearable
          instanceId="sort-select"
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
    </div>
  );
}
