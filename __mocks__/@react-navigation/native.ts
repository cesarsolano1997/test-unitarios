import React from 'react'

export const useNavigation = () => ({
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
  }))
})

export const useRoute = () => ({
  key: 'mock-route-key',
  name: 'MockRoute',
  params: {}
})

export const useFocusEffect = jest.fn()

export const useIsFocused = jest.fn(() => true)

export const NavigationContainer = ({ children }: { children: React.ReactNode }) => children

export const createNavigationContainerRef = jest.fn()
