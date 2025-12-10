import { expect, test, describe } from '@jest/globals'
import { render, screen } from '@testing-library/react-native'
import Typography from '../../../src/design/atoms/Typography'

describe('Typography Component Tests', () => {
  describe('Renderizado básico', () => {
    test('Debería renderizar el texto correctamente', () => {
      render(<Typography>Hello World</Typography>)

      expect(screen.getByText('Hello World')).toBeTruthy()
    })

    test('Debería renderizar con testID cuando se proporciona', () => {
      render(<Typography testID="my-text">Test Text</Typography>)

      expect(screen.getByTestId('my-text')).toBeTruthy()
    })

    test('Debería renderizar children de tipo string', () => {
      render(<Typography>Simple text</Typography>)

      expect(screen.getByText('Simple text')).toBeTruthy()
    })

    test('Debería renderizar children de tipo número', () => {
      render(<Typography>{123}</Typography>)

      expect(screen.getByText('123')).toBeTruthy()
    })
  })

  describe('Variantes', () => {
    test('Debería renderizar variante h1', () => {
      render(<Typography variant="h1" testID="h1-text">Heading 1</Typography>)

      const text = screen.getByTestId('h1-text')
      expect(text).toBeTruthy()
      expect(screen.getByText('Heading 1')).toBeTruthy()
    })

    test('Debería renderizar variante h2', () => {
      render(<Typography variant="h2" testID="h2-text">Heading 2</Typography>)

      const text = screen.getByTestId('h2-text')
      expect(text).toBeTruthy()
    })

    test('Debería renderizar variante h3', () => {
      render(<Typography variant="h3" testID="h3-text">Heading 3</Typography>)

      const text = screen.getByTestId('h3-text')
      expect(text).toBeTruthy()
    })

    test('Debería renderizar variante body por defecto', () => {
      render(<Typography testID="body-text">Body text</Typography>)

      const text = screen.getByTestId('body-text')
      expect(text).toBeTruthy()
    })

    test('Debería renderizar variante caption', () => {
      render(<Typography variant="caption" testID="caption-text">Caption text</Typography>)

      const text = screen.getByTestId('caption-text')
      expect(text).toBeTruthy()
    })

    test('Debería renderizar variante label', () => {
      render(<Typography variant="label" testID="label-text">Label text</Typography>)

      const text = screen.getByTestId('label-text')
      expect(text).toBeTruthy()
    })
  })

  describe('Color personalizado', () => {
    test('Debería aplicar color personalizado', () => {
      render(<Typography color="#FF0000" testID="red-text">Red text</Typography>)

      const text = screen.getByTestId('red-text')
      const styles = Array.isArray(text.props.style) ? text.props.style : [text.props.style]
      const hasColor = styles.some((style: any) => style && style.color === '#FF0000')
      expect(hasColor).toBe(true)
    })

    test('Debería usar color por defecto cuando no se especifica', () => {
      render(<Typography testID="default-text">Default color</Typography>)

      const text = screen.getByTestId('default-text')
      expect(text).toBeTruthy()
    })
  })

  describe('Alineación de texto', () => {
    test('Debería alinear a la izquierda por defecto', () => {
      render(<Typography testID="left-text">Left aligned</Typography>)

      const text = screen.getByTestId('left-text')
      const styles = Array.isArray(text.props.style) ? text.props.style : [text.props.style]
      const hasAlign = styles.some((style: any) => style && style.textAlign === 'left')
      expect(hasAlign).toBe(true)
    })

    test('Debería alinear al centro cuando se especifica', () => {
      render(<Typography align="center" testID="center-text">Center aligned</Typography>)

      const text = screen.getByTestId('center-text')
      const styles = Array.isArray(text.props.style) ? text.props.style : [text.props.style]
      const hasAlign = styles.some((style: any) => style && style.textAlign === 'center')
      expect(hasAlign).toBe(true)
    })

    test('Debería alinear a la derecha cuando se especifica', () => {
      render(<Typography align="right" testID="right-text">Right aligned</Typography>)

      const text = screen.getByTestId('right-text')
      const styles = Array.isArray(text.props.style) ? text.props.style : [text.props.style]
      const hasAlign = styles.some((style: any) => style && style.textAlign === 'right')
      expect(hasAlign).toBe(true)
    })
  })

  describe('Estilos personalizados', () => {
    test('Debería aceptar estilos personalizados', () => {
      const customStyle = { marginTop: 10, marginBottom: 10 }
      render(<Typography style={customStyle} testID="custom-text">Custom styled</Typography>)

      const text = screen.getByTestId('custom-text')
      const styles = Array.isArray(text.props.style) ? text.props.style : [text.props.style]
      const hasMarginTop = styles.some((style: any) => style && style.marginTop === 10)
      const hasMarginBottom = styles.some((style: any) => style && style.marginBottom === 10)
      expect(hasMarginTop).toBe(true)
      expect(hasMarginBottom).toBe(true)
    })

    test('Debería combinar estilos de variante con estilos personalizados', () => {
      const customStyle = { letterSpacing: 2 }
      render(<Typography variant="h1" style={customStyle} testID="combined-text">Combined</Typography>)

      const text = screen.getByTestId('combined-text')
      const styles = Array.isArray(text.props.style) ? text.props.style : [text.props.style]
      const hasLetterSpacing = styles.some((style: any) => style && style.letterSpacing === 2)
      expect(hasLetterSpacing).toBe(true)
    })
  })

  describe('numberOfLines', () => {
    test('Debería aceptar numberOfLines', () => {
      render(<Typography numberOfLines={2} testID="truncated-text">
        This is a very long text that should be truncated after two lines
      </Typography>)

      const text = screen.getByTestId('truncated-text')
      expect(text.props.numberOfLines).toBe(2)
    })

    test('No debería tener numberOfLines por defecto', () => {
      render(<Typography testID="full-text">Full text</Typography>)

      const text = screen.getByTestId('full-text')
      expect(text.props.numberOfLines).toBeUndefined()
    })
  })
})
