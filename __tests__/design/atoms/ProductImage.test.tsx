import { expect, test, describe } from '@jest/globals'
import { render, screen } from '@testing-library/react-native'
import ProductImage from '../../../src/design/atoms/ProductImage'

describe('ProductImage Component Tests', () => {
  const mockUri = 'https://example.com/image.jpg'

  describe('Renderizado básico', () => {
    test('Debería renderizar la imagen con la URI correcta', () => {
      render(<ProductImage uri={mockUri} testID="product-image" />)

      const image = screen.getByTestId('product-image')
      expect(image).toBeTruthy()
      expect(image.props.source.uri).toBe(mockUri)
    })

    test('Debería renderizar con testID cuando se proporciona', () => {
      render(<ProductImage uri={mockUri} testID="my-image" />)

      expect(screen.getByTestId('my-image')).toBeTruthy()
    })
  })

  describe('Tamaños', () => {
    test('Debería renderizar con tamaño medium por defecto', () => {
      render(<ProductImage uri={mockUri} testID="medium-image" />)

      const image = screen.getByTestId('medium-image')
      expect(image).toBeTruthy()
    })

    test('Debería renderizar con tamaño small', () => {
      render(<ProductImage uri={mockUri} size="small" testID="small-image" />)

      const image = screen.getByTestId('small-image')
      expect(image).toBeTruthy()
    })

    test('Debería renderizar con tamaño medium', () => {
      render(<ProductImage uri={mockUri} size="medium" testID="medium-image" />)

      const image = screen.getByTestId('medium-image')
      expect(image).toBeTruthy()
    })

    test('Debería renderizar con tamaño large', () => {
      render(<ProductImage uri={mockUri} size="large" testID="large-image" />)

      const image = screen.getByTestId('large-image')
      expect(image).toBeTruthy()
    })
  })

  describe('Estilos personalizados', () => {
    test('Debería aceptar estilos personalizados', () => {
      const customStyle = { borderRadius: 20 }
      render(<ProductImage uri={mockUri} style={customStyle} testID="custom-image" />)

      const image = screen.getByTestId('custom-image')
      const styles = Array.isArray(image.props.style) ? image.props.style : [image.props.style]
      const hasBorderRadius = styles.some((style: any) => style && style.borderRadius === 20)
      expect(hasBorderRadius).toBe(true)
    })

    test('Debería mantener estilos base cuando se agregan personalizados', () => {
      const customStyle = { opacity: 0.8 }
      render(<ProductImage uri={mockUri} style={customStyle} testID="styled-image" />)

      const image = screen.getByTestId('styled-image')
      const styles = Array.isArray(image.props.style) ? image.props.style : [image.props.style]
      const hasOpacity = styles.some((style: any) => style && style.opacity === 0.8)
      expect(hasOpacity).toBe(true)
    })
  })

  describe('URI de imagen', () => {
    test('Debería renderizar con diferentes URIs', () => {
      const uri1 = 'https://example.com/image1.jpg'
      const uri2 = 'https://example.com/image2.png'

      const { rerender } = render(<ProductImage uri={uri1} testID="dynamic-image" />)

      expect(screen.getByTestId('dynamic-image').props.source.uri).toBe(uri1)

      rerender(<ProductImage uri={uri2} testID="dynamic-image" />)

      expect(screen.getByTestId('dynamic-image').props.source.uri).toBe(uri2)
    })

    test('Debería aceptar URIs con diferentes formatos de imagen', () => {
      const formats = [
        'https://example.com/image.jpg',
        'https://example.com/image.jpeg',
        'https://example.com/image.png',
        'https://example.com/image.webp'
      ]

      formats.forEach(uri => {
        render(<ProductImage uri={uri} testID={`image-${uri.split('.').pop()}`} />)
        expect(screen.getByTestId(`image-${uri.split('.').pop()}`)).toBeTruthy()
      })
    })
  })

  describe('Accesibilidad', () => {
    test('Debería renderizar la imagen', () => {
      render(<ProductImage uri={mockUri} testID="accessible-image" />)

      const image = screen.getByTestId('accessible-image')
      expect(image).toBeTruthy()
      expect(image.props.source.uri).toBe(mockUri)
    })
  })
})
