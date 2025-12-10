import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { ProductImage, Typography } from '../atoms'
import Product from '../../modules/Products/models/IProduct'

export interface ProductCardProps {
  product: Product
  onPress: (product: Product) => void
  testID?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  testID
}) => {
  const isLowStock = product.stock < 5 && product.stock > 0
  const isOutOfStock = product.stock === 0

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(product)}
      testID={testID || `product-item-${product.id}`}
    >
      <ProductImage
        uri={product.image}
        size="medium"
        testID={`product-image-${product.id}`}
      />
      <View style={styles.info}>
        <Typography
          variant="body"
          style={styles.name}
          testID={`product-name-${product.id}`}
          numberOfLines={2}
        >
          {product.name}
        </Typography>
        <Typography
          variant="caption"
          testID={`product-category-${product.id}`}
          style={styles.category}
        >
          {product.category}
        </Typography>
        <Typography
          variant="h3"
          color="#007AFF"
          testID={`product-price-${product.id}`}
          style={styles.price}
        >
          S/.{product.price.toFixed(2)}
        </Typography>
        <Typography
          variant="caption"
          color={isOutOfStock ? '#F44336' : isLowStock ? '#FF9800' : '#4CAF50'}
          testID={`product-stock-${product.id}`}
        >
          {isOutOfStock ? 'Out of stock' : `${product.stock} in stock`}
        </Typography>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center'
  },
  name: {
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4
  },
  category: {
    marginBottom: 4
  },
  price: {
    marginBottom: 4
  }
})

export default ProductCard
