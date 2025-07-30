# Product Listing Page with Shopping Cart

A modern, responsive Product Listing Page built with React, TypeScript, and Tailwind CSS. Features include infinite scroll, shopping cart functionality, and comprehensive error handling.

## 🚀 Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Infinite Scroll**: Lazy loading with automatic pagination for better performance
- **Shopping Cart**: Full cart functionality with quantity management and totals
- **Error Handling**: Comprehensive error handling for API failures and edge cases

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Testing Library** - Testing
- **Jest** - Test runner
- **Vite** - Build tool

## 📦 Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone https://github.com/EqualExperts-Assignments/equal-experts-reasonable-subtle-exciting-atmosphere-0ab81d282fc0.git
   cd equal-experts-reasonable-subtle-exciting-atmosphere-0ab81d282fc0
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test -- --coverage
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Cart.tsx        # Shopping cart component
│   ├── Header.tsx      # Application header
│   ├── ProductCard.tsx # Individual product card
│   ├── ProductList.tsx # Product grid container
│   ├── LoadingSpinner.tsx # Loading states
│   └── ErrorMessage.tsx   # Error handling UI
├── context/            # React Context providers
│   └── CartContext.tsx # Cart state management
├── hooks/              # Custom React hooks
│   ├── useProducts.ts  # Product fetching logic
│   └── useInfiniteScroll.ts # Infinite scroll logic
├── types/              # TypeScript type definitions
│   └── product.ts      # Product and cart types
├── __tests__/          # Test files
│   ├── Cart.test.tsx
│   ├── ProductCard.test.tsx
│   ├── useProducts.test.tsx
│   └── useInfiniteScroll.test.tsx
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
├── index.css           # Global styles
└── setupTests.ts       # Test configuration
```

## 🐛 Troubleshooting

### Common Issues

1. **Products not loading**:
   - Check network connection
   - Verify API endpoint is accessible
   - Check browser console for errors

2. **Images not displaying**:
   - Images have fallback URLs for broken links
   - Check if external image URLs are accessible

3. **Cart not updating**:
   - Ensure JavaScript is enabled
   - Check browser console for errors
   - Verify product data integrity

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
