import { Product } from '../types';

export interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

export const getProducts = async (filters?: FilterParams): Promise<Product[]> => {
  try {
    // Vercel'de NEXT_PUBLIC_API_URL environment variable'ını kullanır
    // Local development için localhost kullanır
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    let url = `${baseUrl}/api/products`;
    
    if (filters) {
      const params = new URLSearchParams();
      if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.minRating !== undefined) params.append('minRating', filters.minRating.toString());
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}; 