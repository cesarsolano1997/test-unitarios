import Product from '../models/IProduct'

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 999.99,
    description: 'The latest iPhone with A17 Pro chip',
    image: 'https://images.unsplash.com/photo-1702184117235-56002cb13663?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 10,
    category: 'Smartphones'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    price: 899.99,
    description: 'Flagship Android phone with AI features',
    image: 'https://images.unsplash.com/photo-1705585174953-9b2aa8afc174?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 15,
    category: 'Smartphones'
  },
  {
    id: 3,
    name: 'MacBook Pro 16"',
    price: 2499.99,
    description: 'Powerful laptop with M3 Max chip',
    image: 'https://images.unsplash.com/photo-1642436381301-e31b17223a5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 5,
    category: 'Laptops'
  },
  {
    id: 4,
    name: 'AirPods Pro',
    price: 249.99,
    description: 'Wireless earbuds with active noise cancellation',
    image: 'https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 20,
    category: 'Audio'
  },
  {
    id: 5,
    name: 'iPad Air',
    price: 599.99,
    description: 'Versatile tablet for work and play',
    image: 'https://images.unsplash.com/photo-1682427286841-1f3ff788752b?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 8,
    category: 'Tablets'
  }
]
