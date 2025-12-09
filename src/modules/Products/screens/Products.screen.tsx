import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import Product from '../models/IProduct'
import { mockProducts } from '../mocks/mockProducts'

type RootStackParamList = {
  Products: undefined
  DetailProduct: { product: Product }
}

type ProductsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Products'
>

interface Props {
  navigation: ProductsScreenNavigationProp
}

const ProductsScreen = ({ navigation }: Props) => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [searchQuery, products])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulación de llamada API
      await new Promise(resolve => setTimeout(resolve, 1000))

      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
    } catch (err) {
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products)
      return
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setFilteredProducts(filtered)
  }

  const handleProductPress = (product: Product) => {
    navigation.navigate('DetailProduct', { product })
  }

  const handleRetry = () => {
    fetchProducts()
  }

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
      testID={`product-item-${item.id}`}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        testID={`product-image-${item.id}`}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} testID={`product-name-${item.id}`}>
          {item.name}
        </Text>
        <Text style={styles.productCategory} testID={`product-category-${item.id}`}>
          {item.category}
        </Text>
        <Text style={styles.productPrice} testID={`product-price-${item.id}`}>
          ${item.price.toFixed(2)}
        </Text>
        <Text
          style={[
            styles.productStock,
            item.stock < 5 && styles.lowStock
          ]}
          testID={`product-stock-${item.id}`}
        >
          {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
        </Text>
      </View>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <View style={styles.centerContainer} testID="loading-container">
        <ActivityIndicator size="large" color="#007AFF" testID="loading-spinner" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centerContainer} testID="error-container">
        <Text style={styles.errorText} testID="error-message">{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={handleRetry}
          testID="retry-button"
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container} testID="products-container">
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          testID="search-input"
        />
      </View>

      {filteredProducts.length === 0
        ? (
        <View style={styles.emptyContainer} testID="empty-container">
          <Text style={styles.emptyText}>No products found</Text>
        </View>
          )
        : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          testID="products-list"
        />
          )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  searchInput: {
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16
  },
  listContainer: {
    padding: 16
  },
  productCard: {
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
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E0E0E0'
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center'
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4
  },
  productCategory: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4
  },
  productStock: {
    fontSize: 12,
    color: '#4CAF50'
  },
  lowStock: {
    color: '#FF9800'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666'
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
    marginBottom: 16
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: '#666666'
  }
})

export default ProductsScreen
