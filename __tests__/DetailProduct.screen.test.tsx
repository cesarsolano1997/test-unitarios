import { expect, jest, test, describe, beforeEach } from '@jest/globals'
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native'
import DetailProductScreen from '../src/modules/Products/screens/DetailProduct.screen'
import Product from '../src/modules/Products/models/IProduct'
import { Alert } from 'react-native'
import { mockProduct, mockProductLowStock, mockProductOutOfStock } from '../__mocks__/products.mock'

// Mock de Alert
jest.spyOn(Alert, 'alert')

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  setOptions: jest.fn()
} as any

const renderDetailProductScreen = (product: Product) => {
  const mockRoute = {
    params: { product },
    key: 'test-key',
    name: 'DetailProduct'
  } as any

  return render(
    <DetailProductScreen navigation={mockNavigation} route={mockRoute} />
  )
}

describe('DetailProduct Screen Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Renderizado básico', () => {
    test('Debería renderizar la pantalla de detalle del producto', () => {
      renderDetailProductScreen(mockProduct)

      // render(<Button label={"mi botton"}/>)
      // screen.getAllByText("mi boton") // <Text>{props.label}</Tex>
      expect(screen.getByTestId('detail-product-container')).toBeTruthy()
    })

    test('Debería mostrar la información del producto correctamente', () => {
      renderDetailProductScreen(mockProduct)

      expect(screen.getByTestId('detail-product-name')).toBeTruthy()

      expect(screen.getByTestId('detail-product-name')).toBeTruthy()
      expect(screen.getByText('iPhone 15 Pro')).toBeTruthy()
      expect(screen.getByText('SMARTPHONES')).toBeTruthy()
      expect(screen.getByText('The latest iPhone with A17 Pro chip')).toBeTruthy()
    })

    test('Debería mostrar la imagen del producto', () => {
      renderDetailProductScreen(mockProduct)

      const image = screen.getByTestId('detail-product-image')
      expect(image).toBeTruthy()
      expect(image.props.source.uri).toBe(mockProduct.image)
    })

    test('Debería mostrar el precio correcto', () => {
      renderDetailProductScreen(mockProduct)

      const input = screen.getByTestId('detail-product-price')

      expect(input).toBeTruthy()
      expect(screen.getByText('S/.999.99')).toBeTruthy()
    })

    test('Debería mostrar el indicador de stock', () => {
      renderDetailProductScreen(mockProduct)

      expect(screen.getByTestId('detail-product-stock')).toBeTruthy()
      expect(screen.getByText('10 items in stock')).toBeTruthy()
    })
  })

  describe('Selector de cantidad', () => {
    test('Debería iniciar con cantidad en 1', () => {
      renderDetailProductScreen(mockProduct)

      const quantityText = screen.getByTestId('quantity-text')
      expect(quantityText.props.children).toBe(1)
    })

    test('Debería incrementar la cantidad al presionar el botón +', () => {
      renderDetailProductScreen(mockProduct)

      const increaseButton = screen.getByTestId('increase-quantity-button')
      fireEvent.press(increaseButton)

      const quantityText = screen.getByTestId('quantity-text')
      expect(quantityText.props.children).toBe(2)
    })

    test('Debería decrementar la cantidad al presionar el botón -', () => {
      renderDetailProductScreen(mockProduct)

      // Primero incrementar a 2
      const increaseButton = screen.getByTestId('increase-quantity-button')
      fireEvent.press(increaseButton)

      // Luego decrementar
      const decreaseButton = screen.getByTestId('decrease-quantity-button')
      fireEvent.press(decreaseButton)

      const quantityText = screen.getByTestId('quantity-text')
      expect(quantityText.props.children).toBe(1)
    })

    test('No debería permitir decrementar por debajo de 1', () => {
      renderDetailProductScreen(mockProduct)

      const decreaseButton = screen.getByTestId('decrease-quantity-button')
      const quantityText = screen.getByTestId('quantity-text')

      // Intentar decrementar cuando ya está en 1
      fireEvent.press(decreaseButton)

      expect(quantityText.props.children).toBe(1)
    })

    test('No debería permitir incrementar más allá del stock disponible', () => {
      const productWithLowStock = { ...mockProduct, stock: 2 }
      renderDetailProductScreen(productWithLowStock)

      const increaseButton = screen.getByTestId('increase-quantity-button')
      const quantityText = screen.getByTestId('quantity-text')

      // Incrementar a 2 (máximo stock)
      fireEvent.press(increaseButton)
      expect(quantityText.props.children).toBe(2)

      // Intentar incrementar más allá del stock - el botón debería estar deshabilitado
      // y la cantidad no debería cambiar
      fireEvent.press(increaseButton)
      expect(quantityText.props.children).toBe(2)
    })
  })

  describe('Cálculo de precio total', () => {
    test('Debería mostrar el precio total correcto para cantidad 1', () => {
      renderDetailProductScreen(mockProduct)

      // Verificar que el texto del precio está visible
      expect(screen.getByText('S/.999.99')).toBeTruthy()
    })

    test('Debería actualizar el precio total al cambiar la cantidad', () => {
      renderDetailProductScreen(mockProduct)

      const increaseButton = screen.getByTestId('increase-quantity-button')
      fireEvent.press(increaseButton)
      fireEvent.press(increaseButton)

      // Verificar que el precio total se actualizó verificando el testID
      const totalPrice = screen.getByTestId('total-price')
      expect(totalPrice).toBeTruthy()
      // El precio debería ser 999.99 * 3 = 2999.97
      const priceText = totalPrice.props.children
      expect(priceText).toContain('2999.97')
    })
  })

  describe('Botón de favoritos', () => {
    test('Debería mostrar el botón de favoritos', () => {
      renderDetailProductScreen(mockProduct)

      expect(screen.getByTestId('favorite-button')).toBeTruthy()
    })

    test('Debería cambiar el estado al presionar el botón de favoritos', () => {
      renderDetailProductScreen(mockProduct)

      const favoriteButton = screen.getByTestId('favorite-button')

      // Presionar el botón
      fireEvent.press(favoriteButton)

      // Verificar que el botón sigue existiendo (el estado interno cambió)
      expect(screen.getByTestId('favorite-button')).toBeTruthy()
    })
  })

  describe('Agregar al carrito', () => {
    test('Debería mostrar el botón "Agregar a carrito" cuando hay stock', () => {
      renderDetailProductScreen(mockProduct)

      expect(screen.getByTestId('add-to-cart-button')).toBeTruthy()
      expect(screen.getByText('Agregar a carrito')).toBeTruthy()
    })

    test('Debería mostrar spinner de carga mientras se procesa la acción', async () => {
      renderDetailProductScreen(mockProduct)

      const addButton = screen.getByTestId('add-to-cart-button')
      fireEvent.press(addButton)

      // El botón muestra un spinner cuando está en estado de carga
      expect(screen.getByTestId('add-to-cart-button-spinner')).toBeTruthy()
    })

    test('Debería mostrar alerta de éxito después de agregar al carrito', async () => {
      renderDetailProductScreen(mockProduct)

      const addButton = screen.getByTestId('add-to-cart-button')
      fireEvent.press(addButton)

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          '¡Éxito!',
          '1 item fue agregado al carrito',
          expect.any(Array)
        )
      }, { timeout: 3000 })
    })

    test('Debería incluir la cantidad correcta en el mensaje de éxito', async () => {
      renderDetailProductScreen(mockProduct)

      // Incrementar cantidad a 3
      const increaseButton = screen.getByTestId('increase-quantity-button')
      fireEvent.press(increaseButton)
      fireEvent.press(increaseButton)

      const addButton = screen.getByTestId('add-to-cart-button')
      fireEvent.press(addButton)

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          '¡Éxito!',
          '3 items fue agregado al carrito',
          expect.any(Array)
        )
      }, { timeout: 3000 })
    })
  })

  describe('Producto sin stock', () => {
    test('Debería mostrar "Out of stock" cuando no hay stock', () => {
      renderDetailProductScreen(mockProductOutOfStock)

      expect(screen.getByText('Out of stock')).toBeTruthy()
    })

    test('No debería mostrar el selector de cantidad cuando no hay stock', () => {
      renderDetailProductScreen(mockProductOutOfStock)

      expect(screen.queryByTestId('increase-quantity-button')).toBeNull()
      expect(screen.queryByTestId('decrease-quantity-button')).toBeNull()
      expect(screen.queryByTestId('quantity-text')).toBeNull()
    })

    test('No debería mostrar el botón "Agregar a carrito" cuando no hay stock', () => {
      renderDetailProductScreen(mockProductOutOfStock)

      expect(screen.queryByText('Agregar a carrito')).toBeNull()
    })

    test('Debería mostrar el indicador de "Out of Stock"', () => {
      renderDetailProductScreen(mockProductOutOfStock)

      expect(screen.getByTestId('out-of-stock-button')).toBeTruthy()
    })
  })

  describe('Stock bajo', () => {
    test('Debería mostrar advertencia para stock bajo', () => {
      renderDetailProductScreen(mockProductLowStock)

      const stockText = screen.getByTestId('detail-product-stock')
      expect(stockText.props.children).toBe('3 items in stock')
    })

    test('Debería permitir agregar al carrito con stock bajo', () => {
      renderDetailProductScreen(mockProductLowStock)

      expect(screen.getByTestId('add-to-cart-button')).toBeTruthy()
    })
  })

  describe('Descripción del producto', () => {
    test('Debería mostrar la sección de descripción', () => {
      renderDetailProductScreen(mockProduct)

      expect(screen.getByText('Descripción')).toBeTruthy()
      expect(screen.getByTestId('detail-product-description')).toBeTruthy()
    })

    test('Debería mostrar el texto de descripción correcto', () => {
      renderDetailProductScreen(mockProduct)

      expect(screen.getByText('The latest iPhone with A17 Pro chip')).toBeTruthy()
    })
  })

  describe('Sección de cantidad', () => {
    test('Debería mostrar el título de la sección cuando hay stock', () => {
      renderDetailProductScreen(mockProduct)

      expect(screen.getByText('Cantidad')).toBeTruthy()
    })

    test('No debería mostrar el título de cantidad cuando no hay stock', () => {
      renderDetailProductScreen(mockProductOutOfStock)

      expect(screen.queryByText('Cantidad')).toBeNull()
    })
  })
})
