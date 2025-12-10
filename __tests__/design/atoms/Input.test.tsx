import { expect, jest, test, describe, beforeEach } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react-native'
import Input from '../../../src/design/atoms/Input'

describe('Input Component Tests', () => {
  const mockOnChangeText = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Renderizado básico', () => {
    test('Debería renderizar el input correctamente', () => {
      render(<Input testID="basic-input" />)

      expect(screen.getByTestId('basic-input')).toBeTruthy()
    })

    test('Debería renderizar con placeholder', () => {
      render(<Input placeholder="Enter text" testID="placeholder-input" />)

      expect(screen.getByPlaceholderText('Enter text')).toBeTruthy()
    })

    test('Debería renderizar con testID cuando se proporciona', () => {
      render(<Input testID="my-input" />)

      expect(screen.getByTestId('my-input')).toBeTruthy()
    })
  })

  describe('Interacciones', () => {
    test('Debería llamar onChangeText cuando el texto cambia', () => {
      render(<Input onChangeText={mockOnChangeText} testID="interactive-input" />)

      const input = screen.getByTestId('interactive-input')
      fireEvent.changeText(input, 'New text')

      expect(mockOnChangeText).toHaveBeenCalledWith('New text')
      expect(mockOnChangeText).toHaveBeenCalledTimes(1)
    })

    test('Debería actualizar el valor del input', () => {
      const { rerender } = render(<Input value="Initial" testID="value-input" />)

      expect(screen.getByDisplayValue('Initial')).toBeTruthy()

      rerender(<Input value="Updated" testID="value-input" />)

      expect(screen.getByDisplayValue('Updated')).toBeTruthy()
    })

    test('Debería manejar múltiples cambios de texto', () => {
      render(<Input onChangeText={mockOnChangeText} testID="multi-input" />)

      const input = screen.getByTestId('multi-input')
      fireEvent.changeText(input, 'First')
      fireEvent.changeText(input, 'Second')
      fireEvent.changeText(input, 'Third')

      expect(mockOnChangeText).toHaveBeenCalledTimes(3)
    })
  })

  describe('Props de TextInput', () => {
    test('Debería aceptar prop secureTextEntry', () => {
      render(<Input secureTextEntry testID="password-input" />)

      const input = screen.getByTestId('password-input')
      expect(input.props.secureTextEntry).toBe(true)
    })

    test('Debería aceptar prop keyboardType', () => {
      render(<Input keyboardType="email-address" testID="email-input" />)

      const input = screen.getByTestId('email-input')
      expect(input.props.keyboardType).toBe('email-address')
    })

    test('Debería aceptar prop autoCapitalize', () => {
      render(<Input autoCapitalize="none" testID="lowercase-input" />)

      const input = screen.getByTestId('lowercase-input')
      expect(input.props.autoCapitalize).toBe('none')
    })

    test('Debería aceptar prop autoCorrect', () => {
      render(<Input autoCorrect={false} testID="no-autocorrect-input" />)

      const input = screen.getByTestId('no-autocorrect-input')
      expect(input.props.autoCorrect).toBe(false)
    })

    test('Debería aceptar prop maxLength', () => {
      render(<Input maxLength={10} testID="limited-input" />)

      const input = screen.getByTestId('limited-input')
      expect(input.props.maxLength).toBe(10)
    })

    test('Debería aceptar prop editable', () => {
      render(<Input editable={false} testID="readonly-input" />)

      const input = screen.getByTestId('readonly-input')
      expect(input.props.editable).toBe(false)
    })
  })

  describe('Estilos personalizados', () => {
    test('Debería aceptar estilos personalizados', () => {
      const customStyle = { backgroundColor: '#f0f0f0' }
      render(<Input style={customStyle} testID="custom-input" />)

      const input = screen.getByTestId('custom-input')
      const styles = Array.isArray(input.props.style) ? input.props.style : [input.props.style]
      const hasBgColor = styles.some((style: any) => style && style.backgroundColor === '#f0f0f0')
      expect(hasBgColor).toBe(true)
    })

    test('Debería mantener estilos base cuando se agregan personalizados', () => {
      const customStyle = { borderWidth: 2 }
      render(<Input style={customStyle} testID="styled-input" />)

      const input = screen.getByTestId('styled-input')
      const styles = Array.isArray(input.props.style) ? input.props.style : [input.props.style]
      const hasBorderWidth = styles.some((style: any) => style && style.borderWidth === 2)
      expect(hasBorderWidth).toBe(true)
    })
  })

  describe('PlaceholderTextColor', () => {
    test('Debería usar color de placeholder por defecto', () => {
      render(<Input placeholder="Test" testID="default-placeholder-input" />)

      const input = screen.getByTestId('default-placeholder-input')
      expect(input.props.placeholderTextColor).toBe('#999999')
    })
  })

  describe('Eventos', () => {
    test('Debería llamar onFocus cuando el input recibe foco', () => {
      const mockOnFocus = jest.fn()
      render(<Input onFocus={mockOnFocus} testID="focus-input" />)

      const input = screen.getByTestId('focus-input')
      fireEvent(input, 'focus')

      expect(mockOnFocus).toHaveBeenCalledTimes(1)
    })

    test('Debería llamar onBlur cuando el input pierde foco', () => {
      const mockOnBlur = jest.fn()
      render(<Input onBlur={mockOnBlur} testID="blur-input" />)

      const input = screen.getByTestId('blur-input')
      fireEvent(input, 'blur')

      expect(mockOnBlur).toHaveBeenCalledTimes(1)
    })

    test('Debería llamar onSubmitEditing cuando se envía', () => {
      const mockOnSubmit = jest.fn()
      render(<Input onSubmitEditing={mockOnSubmit} testID="submit-input" />)

      const input = screen.getByTestId('submit-input')
      fireEvent(input, 'submitEditing')

      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    })
  })

  describe('Valor controlado vs no controlado', () => {
    test('Debería funcionar como input controlado', () => {
      const { rerender } = render(<Input value="Controlled" testID="controlled-input" />)

      expect(screen.getByDisplayValue('Controlled')).toBeTruthy()

      rerender(<Input value="New Value" testID="controlled-input" />)

      expect(screen.getByDisplayValue('New Value')).toBeTruthy()
    })

    test('Debería funcionar como input no controlado', () => {
      render(<Input defaultValue="Uncontrolled" testID="uncontrolled-input" />)

      expect(screen.getByDisplayValue('Uncontrolled')).toBeTruthy()
    })
  })
})
