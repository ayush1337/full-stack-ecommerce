'use client';
import { useDebounce } from '@/lib/hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import { getProductsByQuery } from '../guest_actions';
import ProductItem from '@/components/products/ProductItem';
import Spinner from '@/components/Spinner';
import Filter from '@/components/products/Filter';

const Search = ({ searchParams }) => {
  const [query, setQuery] = useState('');
  const debouncedSearch = useDebounce(query);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(() => true);

        if (!debouncedSearch) {
          setLoading(() => false);
          setProducts(() => []);
          return;
        }
        const { gender, size, category, sort } = searchParams;
        let sizeArray = [];
        let categoryArray = [];
        let sortObject = {};
        if (size) {
          sizeArray = size.split(',');
        }
        if (category) {
          categoryArray = category.split(',');
        }
        switch (sort) {
          case 'price_asc':
            sortObject = { price: 1 };
            break;
          case 'price_dsc':
            sortObject = { price: -1 };
            break;
          case 'product_asc':
            sortObject = { productName: 1 };
            break;
          case 'product_dsc':
            sortObject = { productName: -1 };
            break;
          default:
            sortObject = {
              createdAt: -1,
            };
            break;
        }

        const query = {
          searchQuery: debouncedSearch,
          gender: gender ? gender : 'all',
          categoryArray,
          sizeArray,
          sortObject,
        };
        console.log(query);

        const res = JSON.parse(await getProductsByQuery(query));

        setProducts(() => res);
        setLoading(() => false);
      } catch (error) {
        setLoading(() => false);
      }
    };
    fetchProducts();
  }, [debouncedSearch, searchParams]);
  return (
    <div className="w-full px-4 min-h-screen flex flex-col gap-12">
      <input
        name="search-text"
        placeholder="Search Products..."
        className="w-full text-xl md:text-4xl font-thin focus:outline-none border-b border-gray-500 p-4"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Filter urlPath="/search" />
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className=" gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-6 grid">
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
