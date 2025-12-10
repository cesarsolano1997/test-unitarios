import { expect, jest, test, describe, beforeEach } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react-native'
import Button from '../../../src/design/atoms/Button'

describe('Button Component Tests', () => {
  const mockOnPress = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Renderizado básico', () => {
    test('Debería renderizar el botón con el título correcto', () => {
      render(<Button title="Test Button" onPress={mockOnPress} />)

      expect(screen.getByText('Test Button')).toBeTruthy()
    })

    test('Debería renderizar con testID cuando se proporciona', () => {
      render(<Button title="Test" onPress={mockOnPress} testID="my-button" />)

      expect(screen.getByTestId('my-button')).toBeTruthy()
    })
  })

  describe('Interacciones', () => {
    test('Debería llamar onPress cuando se presiona', () => {
      render(<Button title="Press Me" onPress={mockOnPress} />)

      const button = screen.getByText('Press Me').parent
      fireEvent.press(button!)

      expect(mockOnPress).toHaveBeenCalledTimes(1)
    })

    test('No debería llamar onPress cuando está deshabilitado', () => {
      render(<Button title="Disabled" onPress={mockOnPress} disabled />)

      const button = screen.getByText('Disabled').parent
      fireEvent.press(button!)

      expect(mockOnPress).not.toHaveBeenCalled()
    })

    test('No debería llamar onPress cuando está en estado loading', () => {
      render(<Button title="Loading" onPress={mockOnPress} loading testID="loading-btn" />)

      const button = screen.getByTestId('loading-btn')
      fireEvent.press(button)

      expect(mockOnPress).not.toHaveBeenCalled()
    })
  })

  describe('Variantes', () => {
    test('Debería renderizar con variante primary por defecto', () => {
      render(<Button title="Primary" onPress={mockOnPress} testID="primary-btn" />)

      const button = screen.getByTestId('primary-btn')
      expect(button).toBeTruthy()
    })

    test('Debería renderizar con variante secondary', () => {
      render(<Button title="Secondary" onPress={mockOnPress} variant="secondary" testID="secondary-btn" />)

      const button = screen.getByTestId('secondary-btn')
      expect(button).toBeTruthy()
      expect(screen.getByText('Secondary')).toBeTruthy()
    })

    test('Debería renderizar con variante danger', () => {
      render(<Button title="Delete" onPress={mockOnPress} variant="danger" testID="danger-btn" />)

      const button = screen.getByTestId('danger-btn')
      expect(button).toBeTruthy()
      expect(screen.getByText('Delete')).toBeTruthy()
    })
  })

  describe('Estado de carga', () => {
    test('Debería mostrar spinner cuando loading es true', () => {
      render(<Button title="Save" onPress={mockOnPress} loading testID="test-button" />)

      expect(screen.getByTestId('test-button-spinner')).toBeTruthy()
      expect(screen.queryByText('Save')).toBeNull()
    })

    test('No debería mostrar spinner cuando loading es false', () => {
      render(<Button title="Save" onPress={mockOnPress} loading={false} testID="test-button" />)

      expect(screen.getByText('Save')).toBeTruthy()
      expect(screen.queryByTestId('test-button-spinner')).toBeNull()
    })
  })

  describe('Estado deshabilitado', () => {
    test('Debería aplicar estilos de deshabilitado cuando disabled es true', () => {
      render(<Button title="Disabled" onPress={mockOnPress} disabled testID="disabled-btn" />)

      const button = screen.getByTestId('disabled-btn')
      expect(button.props.accessibilityState.disabled).toBe(true)
    })

    test('No debería estar deshabilitado cuando disabled es false', () => {
      render(<Button title="Enabled" onPress={mockOnPress} disabled={false} testID="enabled-btn" />)

      const button = screen.getByTestId('enabled-btn')
      expect(button.props.accessibilityState.disabled).toBe(false)
    })
  })

  describe('Estilos personalizados', () => {
    test('Debería aceptar estilos personalizados para el contenedor', () => {
      const customStyle = { marginTop: 20 }
      render(<Button title="Custom" onPress={mockOnPress} style={customStyle} testID="custom-btn" />)

      const button = screen.getByTestId('custom-btn')
      // Verificar que el estilo personalizado está incluido en los estilos del botón
      const styles = Array.isArray(button.props.style) ? button.props.style : [button.props.style]
      const hasCustomStyle = styles.some((style: any) => style && style.marginTop === 20)
      expect(hasCustomStyle).toBe(true)
    })

    test('Debería aceptar estilos personalizados para el texto', () => {
      const customTextStyle = { fontSize: 20 }
      render(<Button title="Custom Text" onPress={mockOnPress} textStyle={customTextStyle} />)

      const text = screen.getByText('Custom Text')
      // Verificar que el estilo personalizado está incluido
      const styles = Array.isArray(text.props.style) ? text.props.style : [text.props.style]
      const hasCustomStyle = styles.some((style: any) => style && style.fontSize === 20)
      expect(hasCustomStyle).toBe(true)
    })
  })

  describe('Accesibilidad', () => {
    test('Debería ser accesible por defecto', () => {
      render(<Button title="Accessible" onPress={mockOnPress} testID="accessible-btn" />)

      const button = screen.getByTestId('accessible-btn')
      expect(button.props.accessible).toBe(true)
    })

    test('Debería tener el estado de accesibilidad correcto cuando está deshabilitado', () => {
      render(<Button title="Disabled" onPress={mockOnPress} disabled testID="disabled-btn" />)

      const button = screen.getByTestId('disabled-btn')
      expect(button.props.accessibilityState.disabled).toBe(true)
    })
  })
})
