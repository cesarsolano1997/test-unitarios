import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../../App'
import {
  Button,
  Typography,
  FavoriteButton,
  QuantitySelector,
  PriceDisplay,
  StockIndicator
} from '../../../design'

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
        '¡Éxito!',
        `${quantity} ${quantity === 1 ? 'item' : 'items'} fue agregado al carrito`,
        [
          {
            text: 'Continuar comprando',
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
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={handleToggleFavorite}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Typography
              variant="h2"
              testID="detail-product-name"
              style={styles.productName}
            >
              {product.name}
            </Typography>
            <Typography
              variant="label"
              color="#666666"
              testID="detail-product-category"
              style={styles.productCategory}
            >
              {product.category.toUpperCase()}
            </Typography>
          </View>
        </View>

        <PriceDisplay
          price={product.price}
          size="large"
          testID="detail-product-price"
        />

        <StockIndicator
          stock={product.stock}
          testID="detail-product-stock"
        />

        <View style={styles.divider} />

        <Typography variant="h3" style={styles.sectionTitle}>
          Descripción
        </Typography>
        <Typography
          variant="body"
          testID="detail-product-description"
          style={styles.description}
        >
          {product.description}
        </Typography>

        <View style={styles.divider} />

        {!isOutOfStock && (
          <>
            <Typography variant="h3" style={styles.sectionTitle}>
              Cantidad
            </Typography>
            <QuantitySelector
              quantity={quantity}
              maxQuantity={product.stock}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
            />

            <View style={styles.totalContainer}>
              <Typography variant="h3">Total:</Typography>
              <Typography
                variant="h2"
                color="#007AFF"
                testID="total-price"
              >
                ${getTotalPrice().toFixed(2)}
              </Typography>
            </View>
          </>
        )}
      </View>

      {!isOutOfStock && (
        <View style={styles.buttonContainer}>
          <Button
            title={addingToCart ? 'Agregando...' : 'Agregar a carrito'}
            onPress={handleAddToCart}
            loading={addingToCart}
            testID="add-to-cart-button"
            style={styles.addToCartButton}
          />
        </View>
      )}

      {isOutOfStock && (
        <View style={styles.buttonContainer} testID="out-of-stock-button">
          <Button
            title="Out of Stock"
            onPress={() => {}}
            variant="danger"
            disabled
            style={styles.outOfStockButton}
          />
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
    marginBottom: 8
  },
  productCategory: {
    letterSpacing: 0.5
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20
  },
  sectionTitle: {
    marginBottom: 12
  },
  description: {
    lineHeight: 24
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20
  },
  addToCartButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6
  },
  outOfStockButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6
  }
})

export default DetailProductScreen
