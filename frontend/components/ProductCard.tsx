import React, { useState } from 'react';
import Image from 'next/image';
import { Product, GoldColor } from '../types';
import Rating from './Rating';
import ColorPicker from './ColorPicker';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<GoldColor>('yellow');

  return (
    <div className="bg-white p-4">
      <div className="relative aspect-square mb-4">
        <Image
          src={product.images[selectedColor]}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <h3 className="text-base font-montserrat mb-2">{product.name}</h3>
      
      <div className="flex items-center gap-2 mb-2">
        <Rating value={product.rating} />
        <span className="text-sm text-gray-600">{product.rating.toFixed(1)}</span>
      </div>
      
      <div className="mb-2">
        <span className="font-montserrat text-base">
          ${product.price.toFixed(2)} USD
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm">Yellow Gold</span>
        <ColorPicker
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />
      </div>
    </div>
  );
};

export default ProductCard; 