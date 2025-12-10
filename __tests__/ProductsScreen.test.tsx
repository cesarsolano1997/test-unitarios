import { expect, jest, test, describe, beforeEach } from '@jest/globals'
import { NavigationContainer } from '@react-navigation/native'
import { act, render, screen, waitFor } from '@testing-library/react-native'
import RootStack from '../src/navigation/Root.stack'

jest.useFakeTimers()

describe('App Tests - Products Screen', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

  test('Debería renderizar la pantalla Products', async () => {
    render(
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    )

    // Verificar que aparece el estado de carga inicialmente
    expect(screen.getByTestId('loading-container')).toBeFalsy()
    expect(screen.getByText('Loading products...')).toBeTruthy()
  })

  test('Debería mostrar los productos después de cargar', async () => {
    render(
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    )

    // Avanzar los timers para que termine la simulación de carga
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    // Esperar a que aparezca el contenedor de productos
    await waitFor(() => {
      expect(screen.getByTestId('products-container')).toBeTruthy()
    })

    // Verificar que la barra de búsqueda está presente
    expect(screen.getByTestId('search-input')).toBeTruthy()
    expect(screen.getByPlaceholderText('Buscar productos...')).toBeTruthy()

    // Verificar que la lista de productos está presente
    expect(screen.getByTestId('products-list')).toBeTruthy()
  })

  test('Debería mostrar productos específicos después de cargar', async () => {
    render(
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    )

    // Avanzar los timers
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    // Esperar a que se muestren los productos
    await waitFor(() => {
      expect(screen.getByTestId('products-container')).toBeTruthy()
    })

    // Verificar que existen productos específicos
    await waitFor(() => {
      // Buscar por el primer producto (debería tener id 1)
      expect(screen.getByTestId('product-item-1')).toBeTruthy()
    })
  })

  test('Debería verificar que existe la pantalla Products en el stack de navegación', () => {
    const { UNSAFE_getByType } = render(
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    )

    // Verificar que el stack de navegación se renderiza
    expect(UNSAFE_getByType(NavigationContainer)).toBeTruthy()
  })

  test('Debería mostrar el estado de carga con spinner', () => {
    render(
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    )

    // Verificar spinner de carga
    expect(screen.getByTestId('loading-spinner')).toBeTruthy()
  })

  test('Debería renderizar correctamente sin errores', () => {
    const { root } = render(
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    )

    expect(root).toBeTruthy()
  })
})
