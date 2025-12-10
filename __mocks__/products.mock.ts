import Product from '../src/modules/Products/models/IProduct'

export const mockProduct: Product = {
  id: 1,
  name: 'iPhone 15 Pro',
  price: 999.99,
  description: 'The latest iPhone with A17 Pro chip',
  image: 'https://via.placeholder.com/150',
  stock: 10,
  category: 'Smartphones'
}

export const mockProductOutOfStock: Product = {
  id: 2,
  name: 'Samsung Galaxy S24',
  price: 899.99,
  description: 'Flagship Android phone',
  image: 'https://via.placeholder.com/150',
  stock: 0,
  category: 'Smartphones'
}

export const mockProductLowStock: Product = {
  id: 3,
  name: 'MacBook Pro',
  price: 2499.99,
  description: 'Powerful laptop',
  image: 'https://via.placeholder.com/150',
  stock: 3,
  category: 'Laptops'
}
