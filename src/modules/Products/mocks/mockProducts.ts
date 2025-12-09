import Product from '../models/IProduct'

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 999.99,
    description: 'The latest iPhone with A17 Pro chip',
    image: 'https://via.placeholder.com/150',
    stock: 10,
    category: 'Smartphones'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    price: 899.99,
    description: 'Flagship Android phone with AI features',
    image: 'https://via.placeholder.com/150',
    stock: 15,
    category: 'Smartphones'
  },
  {
    id: 3,
    name: 'MacBook Pro 16"',
    price: 2499.99,
    description: 'Powerful laptop with M3 Max chip',
    image: 'https://via.placeholder.com/150',
    stock: 5,
    category: 'Laptops'
  },
  {
    id: 4,
    name: 'AirPods Pro',
    price: 249.99,
    description: 'Wireless earbuds with active noise cancellation',
    image: 'https://via.placeholder.com/150',
    stock: 20,
    category: 'Audio'
  },
  {
    id: 5,
    name: 'iPad Air',
    price: 599.99,
    description: 'Versatile tablet for work and play',
    image: 'https://via.placeholder.com/150',
    stock: 8,
    category: 'Tablets'
  }
]
