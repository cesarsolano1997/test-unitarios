import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import Product from '../models/IProduct'

type RootStackParamList = {
  Products: undefined
  DetailProduct: { product: Product }
}

type DetailProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DetailProduct'
>

type DetailProductScreenRouteProp = RouteProp<
  RootStackParamList,
  'DetailProduct'
>

interface Props {
  navigation: DetailProductScreenNavigationProp
  route: DetailProductScreenRouteProp
}

const DetailProductScreen = ({ navigation, route }: Props) => {
  const { product } = route.params
  const [quantity, setQuantity] = useState<number>(1)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [addingToCart, setAddingToCart] = useState<boolean>(false)

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1)
    } else {
      Alert.alert(
        'Stock Limit',
        `Only ${product.stock} items available in stock.`,
        [{ text: 'OK' }]
      )
    }
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true)

      // Simulación de agregar al carrito
      await new Promise(resolve => setTimeout(resolve, 500))

      Alert.alert(
        'Success',
        `${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart!`,
        [
          {
            text: 'Continue Shopping',
            onPress: () => navigation.goBack()
          },
          {
            text: 'OK'
          }
        ]
      )
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to add to cart. Please try again.',
        [{ text: 'OK' }]
      )
    } finally {
      setAddingToCart(false)
    }
  }

  const handleToggleFavorite = () => {
    setIsFavorite(prev => !prev)
  }

  const getTotalPrice = (): number => {
    return product.price * quantity
  }

  const isOutOfStock = product.stock === 0

  return (
    <ScrollView
      style={styles.container}
      testID="detail-product-container"
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          testID="detail-product-image"
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
          testID="favorite-button"
        >
          <Text style={styles.favoriteIcon}>
            {isFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.productName} testID="detail-product-name">
              {product.name}
            </Text>
            <Text style={styles.productCategory} testID="detail-product-category">
              {product.category}
            </Text>
          </View>
        </View>

        <Text style={styles.productPrice} testID="detail-product-price">
          ${product.price.toFixed(2)}
        </Text>

        <View style={styles.stockContainer}>
          <Text
            style={[
              styles.stockText,
              isOutOfStock && styles.outOfStock,
              product.stock < 5 && !isOutOfStock && styles.lowStock
            ]}
            testID="detail-product-stock"
          >
            {isOutOfStock
              ? 'Out of stock'
              : `${product.stock} items in stock`}
          </Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.productDescription} testID="detail-product-description">
          {product.description}
        </Text>

        <View style={styles.divider} />

        {!isOutOfStock && (
          <>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={[
                  styles.quantityButton,
                  quantity === 1 && styles.quantityButtonDisabled
                ]}
                onPress={handleDecreaseQuantity}
                disabled={quantity === 1}
                testID="decrease-quantity-button"
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.quantityText} testID="quantity-text">
                {quantity}
              </Text>

              <TouchableOpacity
                style={[
                  styles.quantityButton,
                  quantity >= product.stock && styles.quantityButtonDisabled
                ]}
                onPress={handleIncreaseQuantity}
                disabled={quantity >= product.stock}
                testID="increase-quantity-button"
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalPrice} testID="total-price">
                ${getTotalPrice().toFixed(2)}
              </Text>
            </View>
          </>
        )}
      </View>

      {!isOutOfStock && (
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            addingToCart && styles.addToCartButtonDisabled
          ]}
          onPress={handleAddToCart}
          disabled={addingToCart}
          testID="add-to-cart-button"
        >
          <Text style={styles.addToCartButtonText}>
            {addingToCart ? 'Adding...' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      )}

      {isOutOfStock && (
        <View style={styles.outOfStockButton} testID="out-of-stock-button">
          <Text style={styles.outOfStockButtonText}>Out of Stock</Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  contentContainer: {
    paddingBottom: 100
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
    backgroundColor: '#F5F5F5'
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4
  },
  favoriteIcon: {
    fontSize: 24
  },
  infoContainer: {
    padding: 20
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  titleContainer: {
    flex: 1
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8
  },
  productCategory: {
    fontSize: 14,
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  productPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16
  },
  stockContainer: {
    marginBottom: 16
  },
  stockText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500'
  },
  lowStock: {
    color: '#FF9800'
  },
  outOfStock: {
    color: '#F44336'
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12
  },
  productDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quantityButtonDisabled: {
    backgroundColor: '#CCCCCC'
  },
  quantityButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginHorizontal: 24,
    minWidth: 40,
    textAlign: 'center'
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333'
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF'
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6
  },
  addToCartButtonDisabled: {
    backgroundColor: '#CCCCCC'
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  outOfStockButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#F44336',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  outOfStockButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
})

export default DetailProductScreen
