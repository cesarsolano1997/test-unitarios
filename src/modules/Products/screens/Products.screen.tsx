import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import Product from '../models/IProduct'
import { mockProducts } from '../mocks/mockProducts'
import {
  SearchBar,
  ProductCard,
  LoadingState,
  ErrorState,
  EmptyState
} from '../../../design'
import helper from '../helpers/helper'

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, products])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulación de llamada API
      await new Promise(resolve => setTimeout(resolve, 1000))

      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    const filtered = helper.onFiltered(products, searchQuery)

    setFilteredProducts(filtered)
  }

  const handleProductPress = (product: Product) => {
    navigation.navigate('DetailProduct', { product })
  }

  const handleRetry = () => {
    fetchProducts()
  }

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard product={item} onPress={handleProductPress} />
  )

  if (loading) {
    return <LoadingState message="Loading products..." />
  }

  if (error) {
    return <ErrorState message={error} onRetry={handleRetry} />
  }

  return (
    <View style={styles.container} testID="products-container">
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar productos..."
      />

      {filteredProducts.length === 0
        ? (
        <EmptyState message="No se encontró el producto" />
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
  listContainer: {
    padding: 16
  }
})

export default ProductsScreen
