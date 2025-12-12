import 'react-native-gesture-handler/jestSetup'
import { setUpTests } from 'react-native-reanimated'
setUpTests()

jest.mock('react-native-worklets', () =>
  require('react-native-worklets/lib/module/mock')
)

// jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

// Mock react-native-reanimated
// jest.mock('react-native-reanimated', () => {
//   const View = require('react-native').View
//   const mockAnimatedComponent = (component) => component

//   const reanimatedAPI = {
//     // Hooks
//     useSharedValue: jest.fn((value) => ({ value })),
//     useAnimatedStyle: jest.fn((callback) => callback()),
//     useAnimatedProps: jest.fn((callback) => callback()),
//     useDerivedValue: jest.fn((callback) => ({ value: callback() })),
//     useAnimatedScrollHandler: jest.fn(() => ({})),
//     useAnimatedRef: jest.fn(() => ({ current: null })),
//     useAnimatedReaction: jest.fn(),
//     useAnimatedGestureHandler: jest.fn(() => ({})),

//     // Functions
//     withTiming: jest.fn((value) => value),
//     withSpring: jest.fn((value) => value),
//     withDecay: jest.fn((value) => value),
//     withDelay: jest.fn((_, value) => value),
//     withRepeat: jest.fn((value) => value),
//     withSequence: jest.fn((...values) => values[0]),
//     cancelAnimation: jest.fn(),
//     interpolate: jest.fn((value, inputRange, outputRange) => {
//       // Simple linear interpolation mock
//       const input = typeof value === 'object' ? value.value : value
//       return outputRange[0] + (input - inputRange[0]) * (outputRange[1] - outputRange[0]) / (inputRange[1] - inputRange[0])
//     }),

//     // Easing
//     Easing: {
//       linear: jest.fn(),
//       ease: jest.fn(),
//       quad: jest.fn(),
//       cubic: jest.fn(),
//       bezier: jest.fn()
//     },

//     // Layout animations
//     runOnJS: jest.fn((fn) => fn),
//     runOnUI: jest.fn((fn) => fn),

//     // Components
//     createAnimatedComponent: jest.fn(mockAnimatedComponent),

//     // View components
//     View,
//     ScrollView: View,
//     Text: View,
//     Image: View
//   }

//   return {
//     __esModule: true,
//     ...reanimatedAPI,
//     default: {
//       ...reanimatedAPI,
//       createAnimatedComponent: jest.fn(mockAnimatedComponent)
//     }
//   }
// })

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
