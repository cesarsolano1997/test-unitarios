import 'react-native-gesture-handler/jestSetup'
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      reset: jest.fn(),
      setParams: jest.fn(),
      dispatch: jest.fn(),
      setOptions: jest.fn(),
      isFocused: jest.fn(() => true),
      canGoBack: jest.fn(() => true),
      getParent: jest.fn(),
      getState: jest.fn(() => ({
        routes: [],
        index: 0,
        key: 'mock-state'
      })),
      addListener: jest.fn().mockImplementation((event, callback) => {
        // Retornar una función de limpieza que también tiene métodos
        const cleanup = jest.fn()
        cleanup.remove = jest.fn()
        cleanup.destroy = jest.fn()
        return cleanup
      }),
      removeListener: jest.fn()
    }),
    useRoute: () => ({
      key: 'mock-route-key',
      name: 'MockRoute',
      params: {}
    }),
    useFocusEffect: jest.fn(),
    useIsFocused: jest.fn(() => true)
  }
})
