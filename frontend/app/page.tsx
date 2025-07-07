'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import { Product } from '../types';
import { getProducts, FilterParams } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<FilterParams>({});

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    return Math.ceil(Math.max(...products.map(p => p.price)) / 100) * 100;
  }, [products]);

  const fetchProducts = async (filters?: FilterParams) => {
    setLoading(true);
    const data = await getProducts(filters);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = (filters: FilterParams) => {
    setActiveFilters(filters);
    fetchProducts(filters);
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        <h1 className="text-[32px] font-avenir text-center mb-12">Product List</h1>
        
        {/* Filter Component */}
        <ProductFilter 
          key={`filter-${Object.keys(activeFilters).length}`}
          onFilterChange={handleFilterChange}
          maxPrice={maxPrice}
          activeFilters={activeFilters}
        />
        
        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            {products.length} product{products.length !== 1 ? 's' : ''}
            {hasActiveFilters && (
              <span className="text-gray-500 ml-1">found</span>
            )}
          </p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found with current filters.</p>
            <button
              onClick={() => handleFilterChange({})}
              className="mt-4 bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Scrollbar]}
            navigation
            scrollbar={{ draggable: true }}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="product-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.name}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </main>
  );
} 