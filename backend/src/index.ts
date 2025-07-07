import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { getAllProducts, getFilteredProducts } from './services/products';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the Next.js build
const isDevelopment = process.env.NODE_ENV !== 'production';
const frontendPath = isDevelopment 
  ? path.join(__dirname, '../../frontend/.next/standalone') 
  : path.join(__dirname, '../..');

const publicPath = isDevelopment
  ? path.join(__dirname, '../../frontend/public')
  : path.join(__dirname, '../../frontend/public');

const staticPath = isDevelopment
  ? path.join(__dirname, '../../frontend/.next/static')
  : path.join(__dirname, '../../frontend/.next/static');

// Serve static files only in production
if (!isDevelopment) {
  app.use(express.static(frontendPath));
  app.use('/public', express.static(publicPath));
  app.use('/_next/static', express.static(staticPath));
}

// API Routes
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const { minPrice, maxPrice, minRating } = req.query;
    
    if (minPrice || maxPrice || minRating) {
      const products = await getFilteredProducts(
        minPrice ? Number(minPrice) : undefined,
        maxPrice ? Number(maxPrice) : undefined,
        minRating ? Number(minRating) : undefined
      );
      return res.json(products);
    }
    
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    environment: process.env.NODE_ENV || 'development',
    port: port 
  });
});

// Serve Next.js pages for all other routes (only in production)
if (!isDevelopment) {
  const nextHandler = require(path.join(frontendPath, 'server.js')).default;
  
  app.get('*', (req: Request, res: Response) => {
    try {
      return nextHandler(req, res);
    } catch (error) {
      console.error('Error serving Next.js:', error);
      res.status(500).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Jewelry Store</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
              .card { border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <h1>🏺 Jewelry Store</h1>
            <div class="card">
              <h2>Application Error</h2>
              <p>We're experiencing some technical difficulties. Please try again in a few moments.</p>
              <p>In the meantime, you can access:</p>
              <ul>
                <li><a href="/api/products">🔗 API Products</a></li>
                <li><a href="/health">💚 Health Check</a></li>
              </ul>
            </div>
          </body>
        </html>
      `);
    }
  });
}

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📍 Health check: http://localhost:${port}/health`);
  console.log(`📦 API: http://localhost:${port}/api/products`);
}); 