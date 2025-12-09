import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsScreen from './src/modules/Products/screens/Products.screen'
import DetailProductScreen from './src/modules/Products/screens/DetailProduct.screen'

const Stack = createStackNavigator()

function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF'
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
          name='Products'
          component={ProductsScreen}
          options={{ title: 'Products' }}
        />
        <Stack.Screen
          name='DetailProduct'
          component={DetailProductScreen}
          options={{ title: 'Product Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
