'use client';

import React, { useState, useEffect } from 'react';
import { FilterParams } from '../services/api';

interface ProductFilterProps {
  onFilterChange: (filters: FilterParams) => void;
  maxPrice?: number;
  activeFilters?: FilterParams;
}

export default function ProductFilter({ onFilterChange, maxPrice = 1000, activeFilters }: ProductFilterProps) {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPriceValue, setMaxPriceValue] = useState<number>(maxPrice);
  const [minRating, setMinRating] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Update maxPriceValue when maxPrice prop changes
  useEffect(() => {
    setMaxPriceValue(maxPrice);
  }, [maxPrice]);

  const handleFilterSubmit = () => {
    const filters: FilterParams = {};
    
    if (minPrice > 0) filters.minPrice = minPrice;
    if (maxPriceValue < maxPrice) filters.maxPrice = maxPriceValue;
    if (minRating > 0) filters.minRating = minRating;
    
    onFilterChange(filters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setMinPrice(0);
    setMaxPriceValue(maxPrice);
    setMinRating(0);
    onFilterChange({});
  };

  const hasActiveFilters = activeFilters && Object.keys(activeFilters).length > 0;

  const getActiveFiltersText = () => {
    const filters = [];
    if (minPrice > 0) filters.push(`Min: $${minPrice}`);
    if (maxPriceValue < maxPrice) filters.push(`Max: $${maxPriceValue}`);
    if (minRating > 0) filters.push(`${minRating}★+`);
    return filters.join(', ');
  };

  return (
    <>
      {/* Filter Buttons */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
            </svg>
            <span className="font-medium text-gray-700">Filter</span>
          </button>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="flex items-center space-x-2 bg-red-100 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
            >
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="font-medium text-red-700">Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Background Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="relative bg-white w-80 h-full shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>${minPrice}</span>
                    <span>-</span>
                    <span>${maxPriceValue}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Minimum</label>
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="10"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Maximum</label>
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="10"
                        value={maxPriceValue}
                        onChange={(e) => setMaxPriceValue(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Minimum Rating</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span 
                        key={i} 
                        className={`text-lg ${i < minRating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">{minRating.toFixed(1)}</span>
                  </div>
                  
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t space-y-3">
              <button
                onClick={handleFilterSubmit}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Apply Filters
              </button>
              
              <button
                onClick={handleClearFilters}
                disabled={!hasActiveFilters}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 