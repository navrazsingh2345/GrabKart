import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { categories } from '../assets/assets';

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    let tempProducts = [...products];
    tempProducts = tempProducts.filter((product) => product.inStock);

    // Filter by category (if not 'All')
    if (selectedCategory !== 'All') {
      tempProducts = tempProducts.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (typeof searchQuery === 'string' && searchQuery.trim().length > 0) {
      tempProducts = tempProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Update final filtered list
    setFilteredProducts(tempProducts);
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-3 mt-6 pb-2">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-full border text-sm font-medium shrink-0 transition-all ${
            selectedCategory === 'All'
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.path}
            onClick={() => setSelectedCategory(cat.path)}
            className={`px-4 py-2 rounded-full border text-sm font-medium shrink-0 transition-all ${
              selectedCategory === cat.path
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {cat.text}
          </button>
        ))}
      </div>

      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-2xl font-medium text-primary">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
