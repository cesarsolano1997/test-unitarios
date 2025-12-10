import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsScreen from '../modules/Products/screens/Products.screen'
import DetailProductScreen from '../modules/Products/screens/DetailProduct.screen'
import Product from '../modules/Products/models/IProduct'

export type RootStackParamList = {
    Products: undefined
  DetailProduct: { product: Product }
}

const Stack = createStackNavigator<RootStackParamList>()

const RootStack = () => {
  return (
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
          options={{ title: 'Productos' }}
        />
        <Stack.Screen
          name='DetailProduct'
          component={DetailProductScreen}
          options={{ title: 'Detalle de producto' }}
        />
      </Stack.Navigator>
  )
}

export default RootStack
