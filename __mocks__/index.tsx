export * from './products.mock'

export const mockNavigate = jest.fn()
export const mockGoBack = jest.fn()
export const mockReset = jest.fn()
export const mockSetOptions = jest.fn()

export const createMockNavigation = () => ({
  navigate: mockNavigate,
  goBack: mockGoBack,
  reset: mockReset,
  setOptions: mockSetOptions,
  dispatch: jest.fn(),
  setParams: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  getParent: jest.fn(),
  getState: jest.fn(() => ({
    routes: [],
    index: 0,
    key: 'mock-state'
  }))
})

export const createMockRoute = (params = {}) => ({
  key: 'mock-route-key',
  name: 'MockRoute',
  params
})

export const clearAllMocks = () => {
  mockNavigate.mockClear()
  mockGoBack.mockClear()
  mockReset.mockClear()
  mockSetOptions.mockClear()
}
