import Product from '../models/IProduct'

const onFiltered = (products: Product[], searchQuery: string) => {
  return products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )
}

export default { onFiltered }
