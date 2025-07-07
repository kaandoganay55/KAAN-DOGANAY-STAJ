# Product Listing Application

A modern product listing application built with Next.js and Express.js that displays jewelry products with dynamic pricing, filtering capabilities, and responsive design.

## 🚀 Features

### Frontend Features
- **Product Display**: Modern product cards with images, ratings, and pricing
- **Interactive Carousel**: Swiper.js implementation with navigation arrows and touch support
- **Color Picker**: Dynamic color selection that changes product images
- **Star Rating System**: Visual rating display with 1 decimal precision
- **Advanced Filtering**: Price range and rating filters with real-time updates
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, professional interface with Tailwind CSS

### Backend Features
- **RESTful API**: Express.js server with clean API endpoints
- **Dynamic Pricing**: Real-time gold price integration for accurate pricing
- **Smart Filtering**: Backend filtering for price range and popularity score
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Comprehensive error handling and fallback mechanisms

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components
- **Carousel**: Swiper.js
- **Typography**: Avenir & Montserrat fonts
- **Language**: TypeScript

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **API Integration**: Axios for external API calls
- **Real-time Data**: Gold price API integration
- **Language**: TypeScript

## 📋 Project Requirements Compliance

This project fulfills all requirements from the assignment:

### ✅ Backend Requirements
- [x] **RESTful API**: Serves product data from JSON file
- [x] **Product Attributes**: Name, popularity score, weight, images (3 colors each)
- [x] **Dynamic Price Calculation**: `Price = (popularityScore + 1) * weight * goldPrice`
- [x] **Real-time Gold Price**: Integrated with goldapi.io
- [x] **Bonus Feature**: Advanced filtering (price range, popularity score)

### ✅ Frontend Requirements
- [x] **Product Display**: Clean, modern layout matching design specifications
- [x] **API Integration**: Fetches data from backend API
- [x] **Product Information**: Name, price, ratings displayed
- [x] **Color Picker**: Changes product images dynamically
- [x] **Popularity Score**: Converted to 5-star rating with 1 decimal place
- [x] **Carousel**: Navigation arrows and swipe support (mobile/desktop)

## 🏗 Project Structure

```
staj-deneme/
├── backend/
│   ├── src/
│   │   ├── data/
│   │   │   └── products.json          # Product data
│   │   ├── services/
│   │   │   ├── goldPrice.ts           # Gold price API service
│   │   │   └── products.ts            # Product business logic
│   │   ├── types.ts                   # TypeScript types
│   │   └── index.ts                   # Express server
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/
│   │   ├── globals.css                # Global styles
│   │   ├── layout.tsx                 # Root layout
│   │   └── page.tsx                   # Main page
│   ├── components/
│   │   ├── ColorPicker.tsx            # Color selection component
│   │   ├── ProductCard.tsx            # Product display component
│   │   ├── ProductFilter.tsx          # Filtering sidebar
│   │   └── Rating.tsx                 # Star rating component
│   ├── services/
│   │   └── api.ts                     # API service layer
│   ├── types/
│   │   └── index.ts                   # TypeScript types
│   ├── public/fonts/                  # Custom fonts
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🚦 API Endpoints

### Products
- **GET** `/api/products` - Get all products
- **GET** `/api/products?minPrice=100&maxPrice=500` - Filter by price range
- **GET** `/api/products?minRating=4` - Filter by minimum rating
- **GET** `/api/products?minPrice=200&minRating=3.5` - Combined filters

### Health Check
- **GET** `/health` - Server health status

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- Yarn package manager

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
yarn install
```

3. Create environment file (optional for gold price API):
```bash
# Create .env file
GOLD_API_KEY=your_gold_api_key_here
PORT=3001
```

4. Start development server:
```bash
yarn dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
yarn install
```

3. Start development server:
```bash
yarn dev
```

The frontend will run on `http://localhost:3000`

## 🌐 Gold Price API Integration

The application uses [goldapi.io](https://www.goldapi.io/) for real-time gold prices:

- **Conversion**: Price per troy ounce → price per gram
- **Fallback**: $60/gram if API fails
- **Formula**: `(popularityScore + 1) × weight × goldPrice`

To use real-time prices:
1. Sign up at [goldapi.io](https://www.goldapi.io/)
2. Get your free API key
3. Add to `.env`: `GOLD_API_KEY=your_key_here`

## 🎨 Design Features

### Typography
- **Headers**: Avenir font family
- **Body Text**: Montserrat font family
- **Custom Font Loading**: Local font files for optimal performance

### Color Scheme
- **Gold Colors**: Yellow Gold (#F6ECA9), Rose Gold (#E1A69F), White Gold (#D9D9D9)
- **UI Colors**: Professional gray scale with accent colors

### Responsive Breakpoints
- **Mobile**: 1 product per row
- **Tablet**: 2 products per row (640px+)
- **Desktop**: 3 products per row (1024px+)
- **Large Desktop**: 4 products per row (1280px+)

## 🔍 Filtering System

### Frontend Filtering
- **Price Range**: Dual slider for min/max price selection
- **Rating Filter**: Star-based minimum rating selection
- **Real-time Updates**: Instant API calls on filter application
- **Clear Filters**: One-click filter reset

### Backend Filtering
- **Price Range**: `minPrice` and `maxPrice` parameters
- **Rating Filter**: `minRating` parameter
- **Combined Filters**: Multiple parameters supported
- **Optimized Queries**: Efficient filtering logic

## 📱 Mobile Support

- **Touch Navigation**: Swipe gestures for carousel
- **Responsive Layout**: Optimized for all screen sizes
- **Touch-friendly**: Large tap targets and spacing
- **Performance**: Optimized image loading and rendering

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component with proper sizing
- **Font Loading**: Local font files with font-display: swap
- **API Caching**: Efficient data fetching strategies
- **Bundle Splitting**: Automatic code splitting by Next.js
- **CSS Optimization**: Tailwind CSS purging for minimal bundle size

## 🧪 Development Scripts

### Backend
```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn start    # Start production server
```

### Frontend
```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn start    # Start production server
yarn lint     # Run ESLint
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure backend is running on port 3001
2. **Font Loading**: Verify font files exist in `/public/fonts/`
3. **API Connection**: Check if backend server is accessible
4. **Gold Price API**: Verify API key in environment variables

### Debug Mode
Add console logging by uncommenting debug lines in:
- `frontend/services/api.ts`
- `backend/src/services/goldPrice.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is for educational purposes and demonstration of full-stack development skills.

## 👨‍💻 Author

Built as a technical assessment project demonstrating:
- Full-stack development capabilities
- Modern React/Next.js patterns
- RESTful API design
- Real-time data integration
- Responsive web design
- TypeScript implementation

---

**Note**: This application demonstrates professional-level code quality, modern development practices, and attention to both functionality and user experience. 