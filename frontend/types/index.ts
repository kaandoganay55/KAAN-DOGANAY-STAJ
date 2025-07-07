export interface Product {
  name: string;
  popularityScore: number;
  weight: number;
  price: number;
  rating: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
}

export type GoldColor = 'yellow' | 'rose' | 'white'; 